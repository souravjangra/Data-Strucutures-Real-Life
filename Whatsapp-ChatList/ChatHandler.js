export {ChatHandler, chat_names};

const chat_names = ["Sourav Jangra", "Amit Yadav", "Rahul", "Lovneet", "Vivek", "Nikhil", "Gourav"];
const chat_names_length = chat_names.length;

const chat_msg = ["Aur bro kesa hai?",
"Why you did'nt come to college yesterday",
"Kha par hai?",
"Hello",
"Are you busy?"];
const chat_msg_length = chat_msg.length;
const chat_img_length = 7;

class ChatHandler {

    constructor(chat_template, chat_list) {
        this.hashmap = new Map();
        this.linked_list = null;
        this.chat_template = chat_template; // html template
        this.chat_list = chat_list; // refrence to the chat list
        let clock = new Date();
        this.hours = clock.getHours();
        this.mins = clock.getMinutes();
    }

    getTime(){
        // Time Stamp creation for messages
        this.mins += 1;
        if(this.mins === 60){
            this.hours += 1;
            this.mins = 0;
        }
        if(this.hours === 24){
            this.hours = 0;
        }
        return ("0" + this.hours).slice(-2)+":"+("0" + this.mins).slice(-2);
    }

    createNode(id) {
        // creating node element
        let node = {};
        node['prev'] = null;
        node['next'] = null;

        // creating a copy of chat template
        let chat_item = this.chat_template.cloneNode(true);

        // setting name, message and image to template item
        chat_item.querySelector('#name').innerText = chat_names[id%chat_names_length];
        chat_item.querySelector('#message').innerText = chat_msg[id%chat_msg_length];
        chat_item.querySelector('#image').src = "./images/avatar" + eval(1+(id%chat_img_length)) + ".png";
        node['chat_item'] = chat_item;

        return node;
    }

    newMessage(id) {
        // id -> refers to person
        let node = null;
        if(!(id in this.hashmap)) {
            // id node is not in the hashmap
            node = this.createNode(id);
            this.hashmap[id] = node;
        } else {
            // node is in the hashmap
            node = this.getNodeFromLL(id);
        }

        if(this.linked_list === null) {
            // setting head of the empty linked list
            this.linked_list = node;
        } else {
            // adding node to the head of Linked List
            node['next'] = this.linked_list;
            if(this.linked_list) {
                this.linked_list['prev'] = node;
            }
            this.linked_list = node;
        }
        this.updateList();
    }

    deleteMessage(id) {
        let node = this.getNodeFromLL(id);

        delete this.hashmap[id];
        this.updateList();
    }

    getNodeFromLL(id) {
        let node = this.hashmap[id];
        let prevNode = node['prev'];
        let nextNode = node['next'];

        // update the prev and next node pointers
        if(prevNode !== null) {
            prevNode['next'] = nextNode;
        }
        if(nextNode!==null) {
            nextNode['prev'] = prevNode;
        }

        // update the head of the linked list
        if(node === this.linked_list) {
            this.linked_list = nextNode;
        }
        node['next'] = null;
        node['prev'] = null;

        return node;
    }

    updateList() {
        // Update the contents of the chat list
        let innerHTML = '';
        let head = this.linked_list;
        while(head !== null) {
            let element = head['chat_item'];
            if(head === this.linked_list) {
                element.className = "ks-item ks-active";
                element.querySelector("#time").innerText = this.getTime();
            } else {
                element.className = "ks-item";
            }
            innerHTML += element.outerHTML;
            head=head['next'];
        }
        this.chat_list.innerHTML = innerHTML;
    }
}
