# Order Display System 3
---
## Upgrade from Order Display System 2
ODS 3 was written because ODS 2 was written in Java. With that said, there is nothing *inherently* wrong with java. The problem is that I was using Java with JavaFX as a web browser, sending JavaScript function calls via obscure and undefined methods. It didn't make any sense to keep it that way, so I rewrote the software in Node.jS with Electron. Function calls are easy to make, along with built in functionality to wait for a webpage to fully load before calling any functions. Additionally, there are many better data parsers for Node.js than in Java. The XML parser in Java would cause unnecessary lag due to the way the whole DocumentFactory system was built. It was never meant for the way this program parses data. The fast-xml-parser package is pretty self explanatory. It parses very quickly and converts to a JavaScript object, making it extremely easy to use. This change makes the parsing and display near **instant!** Lastly, there were some features I wanted to add, but wasn't possible due to how ODS 2 was built.

## Feature Changes from ODS2
- Added the ability to write many different kinds of servers to get data. 
    - The current system just has a server send over the data to the main process, where the main process puts it through a parser. The parser and server type can be specified in the config file. To add a new type of server, it needs to be added to `serverStart.js`. The server then uses `process.send()` to communicate with the main process and send data.
- Added the ability to write many data parsers
    - The new system allows for different data parsers. The default parser is the XML parser I wrote. To add a new parser, you add a case to `getDataParser()` in `main.js`. The data parser should return a JavaScript object, which will be used to populate fields.

## How To Use
Before you begin to use the software, you need to setup the configuration files. This directory is different in each operating system:

- On Linux, the config folder should be located in `$XDG_CONFIG_HOME` or `~/.config`.
- On Windows, the config folder should be located in `%APPDATA%`
- On Mac, the config folder should be located in `~/Library/Application Support/`

In each of the folders, there will be an `order-display-system3` folder. In that folder, you need a folder called `config`.

Here's the directory structure using the sample_config:
- config
    - html
        - layout-idle-nobs.html
        - layout-order-nobs.html
        - layout-total-nobs.html
    - images
        - corner.png
        - paymentbg.png
        - pic.jpg
        - pic3.png
    - scripts
        - layout-idle-nobs.js
        - layout-order-nobs.js
        - layout-total-nobs.js
    - stylesheets
        - layout-idle-nobs.css
        - layout-order-nobs.css
        - layout-total-nobs.css
    - config.json
    - external.json

The required files are:
- config.json
- external.json
- html/layout-idle-nobs.html
- html/layout-order-nobs.html
- html/layout-total-nobs.html

The following JavaScript functions need to be define in the following files:
#### layout-idle-nobs.html
- `addImage(imageLocation)`: Adds an image to slideshow
- `setSlideTime(time)`: Changes the amount of time the slideshow switches from one image to another

#### layout-order-nobs.html
- `addToOrder(quantity, name, price, ...condiments)`: Adds 1 item to the order screen with condiments.
- `setSideImage(imageLocation)`: Sets the corner image to the image location specified
- `setDescription(description)`: Sets the description on the right side of the page.
- `setTax(tax)`: Sets the current tax for the order
- `setTotal(total)`: Sets the current total for the order
- `setSubTotal(subTotal)`: Sets the current subtotal for the order
- `updateOrderFontSize(fontSize)`: Sets the font size for the order
- `updateTotalsFontSize(fontSize)`: Sets the font size for the totals
- `updateDescriptionFontSize(fontSize)`: Sets the font size for the description

#### layout-total-nobs.html
- `setSubTotal(subTotal)`: Set the subtotal for the order
- `setTax(tax)`: Sets the tax for the order
- `setTotal(total)`: Sets the total for the order

## Order Data Format
While parsers can be written to parse orders, the order data has to be in the following format : 

### Order in progress
#### Json
```json
{
    "POSOrder": {
        "OrderHeader": {
            "OrderState": "Open",
            "Tax": "0.00",
            "Total": "0.00",
            "Subtotal": "0.00"
        },
        "OrderDetail": {
            "Item": [
                {
                    "Name": "Item1",
                    "Quantity": "1",
                    "Price": "0.00",
                    "Condiments": [
                        {
                            "Description": "Condiment 1"
                        }, {
                            "Description": "Condiment 2"
                        }
                    ]
                },
                {
                    "Name": "Item2",
                    "Quantity": "1",
                    "Price": "0.00",
                    "Condiments": [
                        {
                            "Description": "Condiment 1"
                        }, {
                            "Description": "Condiment 2"
                        }
                    ]
                }
            ]
        }
    }
}
```

#### XML Equivalent
```xml
<POSOrder xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <OrderHeader>
        <OrderState>Open</OrderState>
        <Tax>0.00</Tax>
        <Total>0.00</Total>
        <Subtotal>0.00</Subtotal>
    </OrderHeader>
    <OrderDetail>
        <Item>
            <Name>Item 1</Name>
            <Quantity>1</Quantity>
            <Price>0.00</Price>
            <Condiments>
                <Description>Condiment 1</Description>
                <Description>Condiment 2</Description>
            </Condiments>
        </Item>
        <Item>
            <Name>Item 2</Name>
            <Quantity>1</Quantity>
            <Price>0.00</Price>
            <Condiments>
                <Description>Condiment 1</Description>
                <Description>Condiment 2</Description>
            </Condiments>
        </Item>
    </OrderDetail>
</POSOrder>
```
---
### Totaled Order
#### JSON
```json
{
    "POSOrder": {
        "OrderHeader": {
            "OrderState": "Totaled",
            "Tax": "0.00",
            "Total": "0.00",
            "Subtotal": "0.00"
        }
    }
}
```

#### XML Equivalent
```xml
<POSOrder xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <OrderHeader>
        <OrderState>Totaled</OrderState>
        <Tax>0.00</Tax>
        <Total>0.00</Total>
        <Subtotal>0.00</Subtotal>
    </OrderHeader>
</POSOrder>
```