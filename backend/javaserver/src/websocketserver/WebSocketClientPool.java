package websocketserver;

import java.util.concurrent.Executor;

public class WebSocketClientPool implements Executor{
    
    @Override
    public void execute(Runnable clientHandler){
        new Thread(clientHandler).start();
    }
}
