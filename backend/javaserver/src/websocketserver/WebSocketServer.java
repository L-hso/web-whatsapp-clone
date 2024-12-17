package websocketserver;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Scanner;
import java.util.Base64.Encoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class WebSocketServer {
    private ServerSocket server;
    private Socket client;
    private String message;

    public WebSocketServer(Integer port) throws IOException{
        server = new ServerSocket(port);
        System.out.println("Server in running on 127.0.0.1:" + port.toString());
    }

    public void connect() throws Exception{
        client = server.accept();

        InputStream in = client.getInputStream();
        OutputStream out = client.getOutputStream();
        
        Scanner s = new Scanner(in, "UTF-8");

        String data = s.useDelimiter("\\r\\n\\r\\n").next();

        Matcher isGET = Pattern.compile("^GET").matcher(data);
        
        
        if(isGET.find()){
            Matcher findKey = Pattern.compile("Sec-WebSocket-Key: (.*)").matcher(data);
            
            findKey.find();

            String key = findKey.group(1);

            try{
                String acceptKey = makeAcceptKey(key);

                byte[] response = makeHandshakeResponse(acceptKey);

                out.write(response, 0, response.length);
                onOpen(in);
                s.close();
            } catch(NoSuchAlgorithmException error) {
                //ignore
            }


        } else {
            System.out.println("Must be a GET request with HTTP/1.1 or greater.");
            
        }
    }

    private String makeAcceptKey(String key) throws NoSuchAlgorithmException, IOException{
        String acceptKey;
        
        String GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

        MessageDigest sha1 = MessageDigest.getInstance("SHA-1");

        Encoder base64 = Base64.getEncoder();

        acceptKey = base64.encodeToString(sha1.digest((key+GUID).getBytes("UTF-8")));
        return acceptKey;
    }

    private byte[] makeHandshakeResponse(String acceptKey) throws IOException{
        byte[] response = (
                "HTTP/1.1 101 Switching Protocols\r\n" +
                "Connection: Upgrade\r\n" +
                "Upgrade: websocket\r\n" +
                "Sec-WebSocket-Accept: " + 
                acceptKey +
                "\r\n\r\n" 
            ).getBytes("UTF-8");
        
        
        return response;
    }

    public void onOpen(InputStream in) throws Exception{
        System.out.println("Connected  Client: " + client.toString());

        listenToMessages(in);
    }

    public void listenToMessages(InputStream in) throws Exception{
        
        while (!client.isClosed()) {
            System.out.print("\rAwaiting.  ");
            Thread.sleep(500);
            System.out.print("\r");
            Thread.sleep(500);
            System.out.print("\rAwaiting.. ");
            Thread.sleep(500);
            System.out.print("\r");
            Thread.sleep(500);
            System.out.print("\rAwaiting...");
            Thread.sleep(500);
            System.out.print("\r");

            if(in.available() > 0){
                onMessage(in);
            }
        }  
    }

    public void onMessage(InputStream in) throws IOException{
        ArrayList<Integer> maskingKey;
        ArrayList<Integer> encodedMessage;

        while(in.available() > 0){
            maskingKey = new ArrayList<>();
            encodedMessage = new ArrayList<>();

            in.read();
            int payloadLength = in.read() - 128;
            int extendedPayloadLength = 0;

            if (payloadLength == 126) {
                extendedPayloadLength += in.read();
                extendedPayloadLength += in.read();
            } else if(payloadLength == 127){
                for(int i = 0; i < 8; i++){
                    extendedPayloadLength += in.read();
                }
            }

            for(int i = 0; i < 4; i++){
                maskingKey.add(in.read());
            }
            
            for(int i = (extendedPayloadLength == 0 ? payloadLength :  extendedPayloadLength); i > 0; i--){
                encodedMessage.add(in.read());
            }

            message = decodeMessage(maskingKey, encodedMessage);
            System.out.println(message);
            closeConnection();
        }        
    }

    private String decodeMessage(ArrayList<Integer> maskingKey, ArrayList<Integer> encodedMessage){
        String decodedMessage = "";
        
        for(int i = 0; i < encodedMessage.size(); i++){
            decodedMessage += Character.toString(encodedMessage.get(i) ^ maskingKey.get(i % 4));
        }

        return decodedMessage;
    }

    public void closeConnection() throws IOException{
        
        byte[] closingFrame = {(byte) 136, (byte) 144, 30, 1, 20, 8, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0};
        
        byte[] closingMessage = "just closing".getBytes();
        for(int i = 0; i < closingMessage.length; i++){
            closingFrame[i+6] = (byte) (closingMessage[i] ^ closingFrame[2 + i % 4]);
        }

        client.getOutputStream().write(closingFrame, 0, 2);
        
        server.close();
        client.close();
    }

}
