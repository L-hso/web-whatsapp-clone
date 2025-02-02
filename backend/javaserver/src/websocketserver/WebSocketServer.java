package websocketserver;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Scanner;
import java.util.Base64.Encoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class WebSocketServer {
    private ServerSocket server;
    private final WebSocketClientPool pool = new WebSocketClientPool();

    public WebSocketServer(Integer port) throws IOException{
        server = new ServerSocket(port);
        System.out.println("Server in running on 127.0.0.1:" + port.toString());
    }
    public void connect() throws Exception{
        while (!server.isClosed()) {
            Socket client = server.accept();
    
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
                    onOpen(client);
                    s.close();
                } catch(NoSuchAlgorithmException error) {
                    //ignore
                }
    
    
            } else {
                System.out.println("Must be a GET request with HTTP/1.1 or greater.");
                
            }
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

    private void onOpen(Socket client) throws Exception{
        System.out.println("Connected  Client: " + client.toString());
        pool.execute(new WebSocketClientHandler(client));
    }
}
