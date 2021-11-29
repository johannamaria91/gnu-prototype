import "./overlay.css"



const DeleteTopic = (props) => {

    const url = 'http://localhost:3363/api/discussions'

    function fetchData() {
        props.fetchData()
    }

    const close = () => {
        props.close()
    }

    async function deleteTopic(e, id) {
        e.preventDefault()
        await fetch(url + `/${id}`, {
            method: 'DELETE',
            body: { id: id },
            headers: {
                "Content-type": "application/json",
            }
        });
        fetchData()
    }

    return (
        <div className="newTopicWrapper" >
            <section className="makeNewTopic">
                <h4>Are you sure you want to delete this topic with all its content</h4>
                <button className="close" onClick={close}>✖️</button>
                <div>
                    <button className="button-close" onClick={close}> Cancel</button>
                    <button className="button-delete" onClick={(e) => deleteTopic(e, props.topicid)}>Confirm</button>
                </div>
            </section>
        </div>
    )
}

export default DeleteTopic