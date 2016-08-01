1. Change the IP address in client1.sh in the -client flag and the -advertise flag to your IP address.

2. run the following commands in different terminals

sudo bash server1.sh
sudo bash server2.sh
sudo bash server3.sh
sudo bash client1.sh

You can now communicate with the client external by curls
Register example Example:
curl <your IP>:8500/v1/agent/service/register -H 'Content-Type: application/json' -X PUT -d '{  "ID": "helloWorld3",  "Name": "helloWorld3",  "api": "127.0.0.1",  "Port": 8080,  "Check": {    "Interval": "10s",    "TTL": "15s"  }}'
