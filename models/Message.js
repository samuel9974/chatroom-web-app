// Message Model
class Message {
  constructor(id, sender, content, timestamp) {
    this.id = id;
    this.sender = sender;
    this.content = content;
    this.timestamp = timestamp;
  }

  static messages = [];
  static nextId = 1;

  static create(sender, content) {
    const message = new Message(this.nextId++, sender, content, new Date());
    this.messages.push(message);
    return message;
  }

  static getAll() {
    return this.messages;
  }

  static getById(id) {
    return this.messages.find((msg) => msg.id === id);
  }

  static delete(id) {
    this.messages = this.messages.filter((msg) => msg.id !== id);
  }
}

module.exports = Message;
