package websocketserver;

import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.util.ArrayList;

public class WebSocketClientHandler implements Runnable {

    private Socket client;

    public WebSocketClientHandler(Socket client){
        this.client = client;
    }

    @Override
    public void run(){
        try {
            listenToMessages(client.getInputStream());
        } catch (Exception e) {
            e.printStackTrace();
        }
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
        String message;
        while( in.available() > 0){
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
        }        
        //closeConnection();
    }

    private String decodeMessage(ArrayList<Integer> maskingKey, ArrayList<Integer> encodedMessage){
        String decodedMessage = "";
        
        for(int i = 0; i < encodedMessage.size(); i++){
            decodedMessage += Character.toString(encodedMessage.get(i) ^ maskingKey.get(i % 4));
        }

        return decodedMessage;
    }

    public void closeConnection() throws IOException{
        
        byte[] closingFrame = {(byte) 136, (byte) 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
        
        byte[] closingMessage = "just closing".getBytes();
        for(int i = 0; i < closingMessage.length; i++){
            closingFrame[i+2] = closingMessage[i];
        }

        client.getOutputStream().write(closingFrame, 0, 2);
        client.close();
    }
}
