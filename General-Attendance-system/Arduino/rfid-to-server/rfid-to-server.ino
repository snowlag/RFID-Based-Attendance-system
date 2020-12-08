/* This sketch sends data via HTTP GET requests to esp8266-shop.com and returns the website in html format which is printed on the console */
//RFID-----------------------------
#include <SPI.h>
#include <MFRC522.h>
//NodeMCU--------------------------
#include <ESP8266WiFi.h>
//************************************************************************
/* Set these to your desired credentials. */
const char* ssid = "wifi name"; //replace with your own wifi ssid
const char* password = "password"; //replace with your own //wifi ssid password
//************************************************************************
const char* host = "rfid-college-attendance-system.herokuapp.com"; //host
//192.168.56.1:5000
String OldCardID = "";
unsigned long previousMillis = 0;
const char* device_token  = "device token from server";

//************************************************************************
#define SS_PIN  4  //D2
#define RST_PIN 5 //D1
//************************************************************************
MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance.


void setup()
{ 
  Serial.begin(115200); 
    SPI.begin();  // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522 card
  delay(10); // We start by connecting to a WiFi network Serial.println();
  /* Explicitly set the ESP8266 to be a WiFi-client, otherwise, it by default, would try to act as both a client and an access-point and could cause network-issues with your other WiFi-devices on your WiFi-network. */
  connectToWiFi();
} 



void loop() {
 // check if there's a connection to Wi-Fi or not
  if(!WiFi.isConnected()){
    connectToWiFi();    //Retry to connect to Wi-Fi
  }
  //---------------------------------------------
  if (millis() - previousMillis >= 15000) {
    previousMillis = millis();
    OldCardID="";
  }
  delay(50);
 // ---------------------------------------------
  //look for new card
  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    return;//got to start of loop if there is no card present
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) {
    return;//if read card serial(0) returns 1, the uid struct contians the ID of the read card.
  }
  String CardID ="";
   Serial.println("Reading card");
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    CardID += mfrc522.uid.uidByte[i];
  }
 // ---------------------------------------------
  if( CardID == OldCardID ){
    return;
  }
  else{
    OldCardID = CardID;
  }
  
  SendCardId(CardID , device_token);
  delay(1000);
}
void connectToWiFi(){
    WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
    delay(1000);
    WiFi.mode(WIFI_STA);
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("");
    Serial.println("Connected");
  
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());  //IP address assigned to your ESP
    
    delay(1000);
}


void SendCardId(String Card_uid , String device_token){
   Serial.print("connecting to ");
  Serial.println(host); // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  // We now create a URI for the request
  //this url contains the informtation we want to send to the server
  //if esp8266 only requests the website, the url is empty
  String url = "/api/read/card";
   url += "?cardid=";
    url += Card_uid;
    url += "&device_token=";
    url += device_token;
  
  Serial.print("Requesting URL: ");
  Serial.println(url); // This will send the request to the server
  client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000)
    { Serial.println(">>> Client Timeout !");
      client.stop(); return;
    }
  } // Read all the lines of the reply from server and print them to Serial
  while (client.available())
  { String line = client.readStringUntil('\r'); Serial.print(line);
  }
  Serial.println();
  Serial.println("closing connection");  
}
