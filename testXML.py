import socket

toSend1 = b'''
<?xml version="1.0"?>
<POSOrder xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<OrderHeader>
   <OrderNumber>6588540</OrderNumber>
   <CreateTime>2022-12-20T14:28:27-05:00</CreateTime>
   <OrderType>DriveThru</OrderType>
   <OrderState>Open</OrderState>
   <BusinessDate>2022-12-20T14:28:27-05:00</BusinessDate>
   <Register>D01</Register>
   <OpenTime>2022-12-20T14:28:27-05:00</OpenTime>
   <TotaledTime xsi:nil="true" />
   <PaidTime xsi:nil="true" />
   <CanceledTime xsi:nil="true" />
   <ClosedTime xsi:nil="true" />
   <Discount>0.00</Discount>
   <Tax>0.94</Tax>
   <Total>16.61</Total>
   <Subtotal>15.67</Subtotal>
</OrderHeader>
<OrderDetail>
   <Item>
      <Id>COOO04</Id>
      <Name>Bacon King CMB Med</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>12.98</Price>
      <Condiments>
      </Condiments>
   </Item>
   <Item>
      <Id>FI0104</Id>
      <Name>Medium Fries</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>0.00</Price>
   </Item>
   <Item>
      <Id>SD0I04</Id>
      <Name>Medium COKE</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>0.00</Price>
   </Item>
   <Item>
      <Id>BREW01</Id>
      <Name>Mozzarella 4pc</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>2.69</Price>
   </Item>
</OrderDetail>
</POSOrder>
'''

toSend11 = b'''
<?xml version="1.0"?>
<POSOrder xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<OrderHeader>
   <OrderNumber>6588540</OrderNumber>
   <CreateTime>2022-12-20T14:28:27-05:00</CreateTime>
   <OrderType>DriveThru</OrderType>
   <OrderState>Open</OrderState>
   <BusinessDate>2022-12-20T14:28:27-05:00</BusinessDate>
   <Register>D01</Register>
   <OpenTime>2022-12-20T14:28:27-05:00</OpenTime>
   <TotaledTime xsi:nil="true" />
   <PaidTime xsi:nil="true" />
   <CanceledTime xsi:nil="true" />
   <ClosedTime xsi:nil="true" />
   <Discount>0.00</Discount>
   <Tax>0.94</Tax>
   <Total>16.61</Total>
   <Subtotal>15.67</Subtotal>
</OrderHeader>
<OrderDetail>
   <Item>
      <Id>COOO04</Id>
      <Name>Bacon King CMB Med</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>12.98</Price>
      <Condiments>
      </Condiments>
   </Item>
   <Item>
      <Id>FI0104</Id>
      <Name>Medium Fries</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>0.00</Price>
   </Item>
   <Item>
      <Id>SD0I04</Id>
      <Name>Medium COKE</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>0.00</Price>
   </Item>
   <Item>
      <Id>BREW01</Id>
      <Name>Mozzarella 4pc</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>2.69</Price>
   </Item>
   <Item>
      <Id>BREW02</Id>
      <Name>Double Whopper</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>4.99</Price>
   </Item>
</OrderDetail>
</POSOrder>
'''
toSend12 = b'''
<?xml version="1.0"?>
<POSOrder xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<OrderHeader>
   <OrderNumber>6588540</OrderNumber>
   <CreateTime>2022-12-20T14:28:27-05:00</CreateTime>
   <OrderType>DriveThru</OrderType>
   <OrderState>Open</OrderState>
   <BusinessDate>2022-12-20T14:28:27-05:00</BusinessDate>
   <Register>D01</Register>
   <OpenTime>2022-12-20T14:28:27-05:00</OpenTime>
   <TotaledTime xsi:nil="true" />
   <PaidTime xsi:nil="true" />
   <CanceledTime xsi:nil="true" />
   <ClosedTime xsi:nil="true" />
   <Discount>0.00</Discount>
   <Tax>0.94</Tax>
   <Total>16.61</Total>
   <Subtotal>15.67</Subtotal>
</OrderHeader>
<OrderDetail>
   <Item>
      <Id>COOO04</Id>
      <Name>Bacon King CMB Med</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>12.98</Price>
      <Condiments>
      </Condiments>
   </Item>
   <Item>
      <Id>FI0104</Id>
      <Name>Medium Fries</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>0.00</Price>
   </Item>
   <Item>
      <Id>SD0I04</Id>
      <Name>Medium COKE</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>0.00</Price>
   </Item>
   <Item>
      <Id>BREW01</Id>
      <Name>Mozzarella 4pc</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>2.69</Price>
   </Item>
   <Item>
      <Id>BREW02</Id>
      <Name>Double Whopper</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>4.99</Price>
      <Condiments>
        <Description>Add Chs</Description>
        
      </Condiments>
   </Item>
</OrderDetail>
</POSOrder>
'''

toSend2 = b'''
<?xml version="1.0"?>
<POSOrder xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<OrderHeader>
   <OrderNumber>6588946</OrderNumber>
   <CreateTime>2022-12-21T11:52:49-05:00</CreateTime>
   <OrderType>DriveThru</OrderType>
   <OrderState>Open</OrderState>
   <BusinessDate>2022-12-21T11:52:49-05:00</BusinessDate>
   <Register>D01</Register>
   <OpenTime>2022-12-21T11:52:49-05:00</OpenTime>
   <TotaledTime xsi:nil="true" />
   <PaidTime xsi:nil="true" />
   <CanceledTime xsi:nil="true" />
   <ClosedTime xsi:nil="true" />
   <Discount>0.00</Discount>
   <Tax>0.77</Tax>
   <Total>13.65</Total>
   <Subtotal>12.88</Subtotal>
</OrderHeader>
<OrderDetail>
   <Item>
      <Id>CO0311</Id>
      <Name>Double Whopper CMB MED</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>12.88</Price>
      <Condiments>
         <Description>NO ONION</Description>
         <Description>NO PICKLE</Description>
         <Description>Add LG Am.Chs</Description>
      </Condiments>
   </Item>
   <Item>
      <Id>FI0104</Id>
      <Name>Medium Fries</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>0.00</Price>
   </Item>
   <Item>
      <Id>SD0I04</Id>
      <Name>Medium COKE</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>0.00</Price>
   </Item>
</OrderDetail>
</POSOrder>
'''

toSend3 = b'''
<?xml version="1.0"?>
<POSOrder xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<OrderHeader>
   <OrderNumber>6588947</OrderNumber>
   <CreateTime>2022-12-21T11:52:36-05:00</CreateTime>
   <OrderType>DriveThru</OrderType>
   <OrderState>Totaled</OrderState>
   <BusinessDate>2022-12-21T11:52:36-05:00</BusinessDate>
   <Register>D02</Register>
   <OpenTime>2022-12-21T11:52:36-05:00</OpenTime>
   <TotaledTime>2022-12-21T11:53:17-05:00</TotaledTime>
   <PaidTime xsi:nil="true" />
   <CanceledTime xsi:nil="true" />
   <ClosedTime xsi:nil="true" />
   <Discount>0.00</Discount>
   <Tax>0.82</Tax>
   <Total>14.49</Total>
   <Subtotal>13.67</Subtotal>
</OrderHeader>
<OrderDetail>
</OrderDetail>
</POSOrder>
'''

toSend4 = b'''
<?xml version="1.0"?>
<POSOrder xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<OrderHeader>
   <OrderNumber>6588946</OrderNumber>
   <CreateTime>2022-12-21T11:52:49-05:00</CreateTime>
   <OrderType>DriveThru</OrderType>
   <OrderState>Open</OrderState>
   <BusinessDate>2022-12-21T11:52:49-05:00</BusinessDate>
   <Register>D01</Register>
   <OpenTime>2022-12-21T11:52:49-05:00</OpenTime>
   <TotaledTime xsi:nil="true" />
   <PaidTime xsi:nil="true" />
   <CanceledTime xsi:nil="true" />
   <ClosedTime xsi:nil="true" />
   <Discount>0.00</Discount>
   <Tax>0.77</Tax>
   <Total>13.65</Total>
   <Subtotal>12.88</Subtotal>
</OrderHeader>
<OrderDetail>
   <Item>
      <Id>CO0311</Id>
      <Name>Double Whopper CMB MED</Name>
      <ItemType>Entree</ItemType>
      <Quantity>1</Quantity>
      <Price>12.88</Price>
      <Condiments>
         <Description>NO ONION</Description>
         <Description>NO PICKLE</Description>
         <Description>Add LG Am.Chs</Description>
      </Condiments>
   </Item>
</OrderDetail>
</POSOrder>
'''

host = socket.gethostname()
port = 3009                   # The same port as used by the server
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((host, port))
s.sendall(toSend1)
s.close()
print('done!')
