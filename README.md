# ip-to-coords
Converts an array of IPs to an array of locations

# install
npm install

# run
npm start

# usage

## Array of IPs
type: POST
url: `/geolookup/array`
data: { iplist: [...arrayofIps] }
headers: { "Content-Type": "application/json" }

response:
Array containing locations in the same order as the request.

## Single IP
type: GET
url: `/geolookup/:ip`

response:
Array containing a single location

