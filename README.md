# Name Spinner API

It was created to extract people names who commented on donate Facebook group. The client can be a wheel of names for a draw.

## Methods

/names  
body {  
    "group": "https://www.facebook.com/groups/490065161622264/permalink/1052322248718613/"  
}  
  
response:  
[  
    "Bernardo Smith",  
    "John Doe",  
    "Jane Edo"  
]

## Built with
Nodejs  
Express  
Puppeteer

## Env
PORT=[number]    
EMAIL=[string]  
PASS=[string]  
FACEBOOK_ACCESS_DISABLED=[0 or 1]