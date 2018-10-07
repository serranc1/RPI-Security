#Libraries
import RPi.GPIO as GPIO
import time
import spidev
import os
import smtplib
import datetime

#ultrasonic_distance
#GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)

#set GPIO Pins
GPIO_TRIGGER = 18
GPIO_ECHO = 24

#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)

# Open SPI bus
spi = spidev.SpiDev()
spi.open(0,0)
spi.max_speed_hz=1000000

# Define sensor channels
light_channel = 0
temp_channel  = 1
switch_channel = 2

#global variables for security mode
prevdist = 0
dcaught = 0
prevlight_level = 0
lcaught = 0
prevswitch = 1

def distance():
    # set Trigger to HIGH
    GPIO.output(GPIO_TRIGGER, True)

    # set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER, False)

    StartTime = time.time()
    StopTime = time.time()

    # save StartTime
    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()

    # save time of arrival
    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()
 
    # time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2
    
    return distance
 
# Function to read SPI data from MCP3008 chip
# Channel must be an integer 0-7
def ReadChannel(channel):
  adc = spi.xfer2([1,(8+channel)<<4,0])
  data = ((adc[1]&3) << 8) + adc[2]
  return data
 
# Function to convert data to voltage level,
# rounded to specified number of decimal places.
def ConvertVolts(data,places):
  volts = (data * 3.3) / float(1023)
  volts = round(volts,places)
  return volts
 
# Function to calculate temperature from
# TMP36 data, rounded to specified
# number of decimal places.
def ConvertTemp(data,places):
 
  # ADC Value
  # (approx)  Temp  Volts
  #    0      -50    0.00
  #   78      -25    0.25
  #  155        0    0.50
  #  233       25    0.75
  #  310       50    1.00
  #  465      100    1.50
  #  775      200    2.50
  # 1023      280    3.30
 
  temp = (((data * 330)/float(1023))-50)
  temp = round(temp,places)
  return temp

def ConvertSwitch(data, places):
    switch = (data * 3.3) / float(1023)
    switch = round(switch, places)
    return switch

#email
def email():
    
    smtpUser = 'christianserrano64@gmail.com'
    smtpPass = '1Cheese_cake'

    toAdd = 'morrowrayx@gmail.com'
    fromAdd = smtpUser

    subject = 'Alert! Suspicious activity detected!'
    header = 'To: ' + toAdd + '\n' + 'From: ' + fromAdd + '\n' + 'Subject: ' + subject
    body = 'A sensor picked up a sudden change in the surrounding area.'

    #print header + '\n' + body

    s = smtplib.SMTP('smtp.gmail.com',587)

    s.ehlo()
    s.starttls()
    s.ehlo()

    s.login(smtpUser, smtpPass)
    s.sendmail(fromAdd, toAdd, header + '\n' + body)

    s.quit()


if __name__ == '__main__':
    try:
        while True:
            switch_level = ReadChannel(switch_channel)
            switch_volts = ConvertSwitch(switch_level, 2)

            # Print out results
            #print "--------------------------------------------"
            #print("Switch: {} ({}V)".format(switch_level,switch_volts))
            #print("Temp : {} ({}V) {} deg C".format(temp_level,temp_volts,temp))
            if (switch_volts == 0):
                
                if(prevswitch == 1):
                    print("Security mode active in...")
                    print("3...")
                    time.sleep(1)
                    print("2...")
                    time.sleep(1)
                    print("1...")
                    time.sleep(1)
                    print("Security mode active.")
                    prevswitch = 0
                #ultrasonic_distance
                if(prevdist == 0):
                    prevdist = distance()
                    
                dist = distance()
                #print ("Measured Distance = %.1f cm" % dist)
                if((prevdist - dist < -20 or prevdist - dist > 20) and dcaught == 0):
                    print ("Motion detected! Sending email...")
                    email()
                    dcaught = 5
                    time.sleep(1)
                prevdist = dist;
                if (dcaught > 0):
                    dcaught = dcaught - 1
                    
                #adcmeasure
                if(prevlight_level == 0):
                    prevlight_level = ReadChannel(light_channel)
     
                # Read the light sensor data
                light_level = ReadChannel(light_channel)
                light_volts = ConvertVolts(light_level,2)
      
                if((prevlight_level - light_level < -100 or prevlight_level - light_level > 100) and lcaught == 0):
                    print("Light change detected! Sending email...")
                    email()
                    lcaught = 5
                    time.sleep(1)
                prevlight_level = light_level
          
     
                # Read the temperature sensor data
                temp_level = ReadChannel(temp_channel)
                temp_volts = ConvertVolts(temp_level,2)
                temp       = ConvertTemp(temp_level,2)
     
                # Print out results
                #print "--------------------------------------------"
                #print("Light: {} ({}V)".format(light_level,light_volts))
                #print("Temp : {} ({}V) {} deg C".format(temp_level,temp_volts,temp))
      
                if(lcaught > 0):
                    lcaught = lcaught - 1

                # Wait before repeating loop
                time.sleep(0.1)
                
            else:
                if(prevswitch == 0):
                    print("Home mode active.")
                    prevswitch = 1
                # Read the temperature sensor data
                temp_level = ReadChannel(temp_channel)
                temp_volts = ConvertVolts(temp_level,2)
                temp       = ConvertTemp(temp_level,2)

                clock = datetime.datetime.now()
                print("{}".format(clock))
                print("Temp : {} ({}V) {} deg C".format(temp_level,temp_volts,temp))

                # Wait before repeating loop
                time.sleep(1)
                
              
    # Reset by pressing CTRL + C
    except KeyboardInterrupt:
            print("Measurement stopped by User.")
            GPIO.cleanup()
 
