import java.security.NoSuchAlgorithmException;


import websocketserver.WebSocketServer;

public class App {
    public static void main(String[] args) throws Exception, NoSuchAlgorithmException, InterruptedException {
       WebSocketServer server = new WebSocketServer(5050);
       server.connect();
    }
}
