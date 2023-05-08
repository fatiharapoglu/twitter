export default function Messages({ selectedMessages, handleConversations }: any) {
    console.log(selectedMessages);

    return (
        <div>
            <button onClick={() => handleConversations(false)}>Return</button>
            <div>Messages</div>
            <div>New Messages</div>
        </div>
    );
}
