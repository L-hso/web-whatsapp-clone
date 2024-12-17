export class MessageService {

  

  /**
   *
   * @param {string} messageId
   * @param {{content: string}} newMessage
   * @returns
   */
  async editMessage(messageId, newMessage) {}

  /**
   *
   * @param {string} messageId
   * @param {boolean} forAll
   */
  async deleteMessage(messageId, forAll) {}

  /**
   *
   * @param {string} messageId
   * @param {number} durationDays
   */
  async pinMessage(messageId, durationDays) {}

  /**
   *
   * @param {string} messageId
   */
  async favoriteMessage(messageId) {}
}

export class ChatService {

  /**
   * 
   * @param {WebSocket} connection 
   */
  constructor(connection){
    //this.connection = connection;
  }

  /**
   *
   * @param {string} chatId
   * @param {{sender: string, content: string, date: string}} message
   * @returns
   */
  async chatConnection(chatId, message) {
    //this.connection.send(JSON.stringify({sender:"Me", content: message, date: Date.now()}));
  }

  async reportChat(){
  }

  async exitGroup(){
  }

  /**
   *
   * @param {string} chatId
   */
  async archiveChat(chatId) {
    
  }

  /**
   * 
   * @param {string} chatId 
   */
  async deleteChat(chatId) {
    

  }

  /**
   * 
   * @param {string} chatId 
   */
  async pinChat(chatId) {}

  /**
   * 
   * @param {string} chatId 
   */
  async favoriteChat(chatId) {}

  /**
   * 
   * @param {string} chatId 
   */
  async blockChat(chatId) {}
  
  /**
   * 
   * @param {string} chatId 
   */
  async cleanChat(chatId){}
}
