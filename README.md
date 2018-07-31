![alt text](https://s3.amazonaws.com/publicly-available-assets/SLVLogo.png)
# Squid Log Viewer

When using the service Squid to turn your server into a proxy, reading the logs are difficult in the terminal. Filtering through the already hard-to-see rows of log entries sucks.

Use Squid Log Viewer instead! Super easy to set up, lightweight, and makes dealing with Squid web proxy logs much easier (it's also mobile friendly). 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install these two services:
```
Squid - http://www.squid-cache.org/
Apache - https://httpd.apache.org/
```

Setting up Apache and Squid
```
Once installed, configure the apache web server as you wish. In the apache html directory, make sure to create a directory named "squid_stuff". 

Next, configure the Squid proxy as you wish, but make it's logging to a file called "squid_access.log" inside the "squid_stuff" directory. Also make sure the access logging format is the default one. Check below for a sample squid.conf file.

(side note: make sure Squid has permission to edit the "squid_stuff" directory)
```

### Sample squid.conf

```
http_port 8080
#
# Recommended minimum configuration:
#
# Example rule allowing access from your local networks.
# Adapt to list your (internal) IP networks from where browsing
# should be allowed
acl localnet src 10.0.0.0/8 # RFC1918 possible internal network
acl localnet src 172.16.0.0/12  # RFC1918 possible internal network
acl localnet src 192.168.0.0/16 # RFC1918 possible internal network
acl localnet src fc00::/7       # RFC 4193 local private network range
acl localnet src fe80::/10      # RFC 4291 link-local (directly plugged) machines

acl SSL_ports port 443
acl Safe_ports port 80      # http
acl Safe_ports port 21      # ftp
acl Safe_ports port 443     # https
acl Safe_ports port 70      # gopher
acl Safe_ports port 210     # wais
acl Safe_ports port 1025-65535  # unregistered ports
acl Safe_ports port 280     # http-mgmt
acl Safe_ports port 488     # gss-http
acl Safe_ports port 591     # filemaker
acl Safe_ports port 777     # multiling http
acl CONNECT method CONNECT

#
# Recommended minimum Access Permission configuration:
#
# Deny requests to certain unsafe ports
# http_access deny !Safe_ports

# Deny CONNECT to other than secure SSL ports
# http_access deny CONNECT !SSL_ports

# Only allow cachemgr access from localhost
http_access allow localhost manager
http_access deny manager

# We strongly recommend the following be uncommented to protect innocent
# web applications running on the proxy server who think the only
# one who can access services on "localhost" is a local user
http_access deny to_localhost

# allow all requests    
acl all src all
http_access allow all

# Make sure your custom config is before the "deny all" line
http_access deny all
#access_log /var/log/squid/access.log squid
access_log /var/www/html/squid_stuff/squid_access.log squid
```

### Installing the viewer

```
You need the files in this repo inside the web server directory (which directory? for example, for Apache on Ubuntu it's /var/www/html) Also, you don't have to download the "squid_stuff" dir from this repo if you already made it in the previous step.

(note: these files should NOT be in the "squid_stuff" directory. They should be in the parent directory of "squid_stuff")

Once these filed are on your server, you're ready to go. Navigate to the IP of your web server in your browser and you should see the Squid Log Viewer up and running.

Live example at: http://144.202.66.17/

Or refer below for a screenshot.
```

It should look like this: 
![alt text](https://s3.amazonaws.com/publicly-available-assets/SLVSample.png)

## Built With

* [Squid](http://www.squid-cache.org/) - Web proxy service used with VPS
* [Apache](https://httpd.apache.org/) - Web server service used with VPS
* [Boostrap](https://maven.apache.org/) - Front End framework
* [DataTable](https://datatables.net/) - Used to generate Data Table
* [Plot.ly](https://plot.ly/) - Used to generate map
* [ipstack](https://ipstack.com/) - Used to fetch IP information


## Authors

* **Akash Kundu**

## Acknowledgments

* Jaeson Schultz
* Everyone on StackOverflow
