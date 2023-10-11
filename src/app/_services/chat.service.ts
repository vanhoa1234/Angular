import { EventEmitter, Injectable } from '@angular/core';
// import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Message } from '../_models/message';

@Injectable()
export class ChatService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  // private _hubConnection!: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
     this.startConnection();
    console.log('start chat service');
  }

  sendMessage(message: Message) {
    
    console.log(message);
    // if (this._hubConnection.connectionId)
    //   message.connectionId = this._hubConnection.connectionId;
    // this._hubConnection.invoke('NewMessage', message);
  }

  private createConnection() {
    // this._hubConnection = new HubConnectionBuilder()
    //   .withUrl('https://localhost:7219/offers')
    //   .build();
  }

  private startConnection(): void {
    // this._hubConnection
    //   .start()
    //   .then(() => {
    //     this.connectionIsEstablished = true;
    //     console.log('Hub connection started');

    //     this.connectionEstablished.emit(true);
    //   })
    //   .catch(err => {
    //     console.log('Error while establishing connection, retrying...');
    //     setTimeout(() => { this.startConnection(); }, 5000);
    //   });
  }

  private registerOnServerEvents(): void {
    // console.log("registerOnServerEvents");
    // this._hubConnection.on('MessageReceived', (data: any) => {
    //   this.messageReceived.emit(data);
    // });
  }
}  
