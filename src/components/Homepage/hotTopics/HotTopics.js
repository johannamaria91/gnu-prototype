import React from 'react'
import './hottopics.css'

const HotTopics = (props) => {

    const topics = props.filteredTopics
    const sortedTopics = topics.sort((firstItem, secondItem) => secondItem.numberOfPosts - firstItem.numberOfPosts )
    const hotTopics = sortedTopics.slice(0, 3)

    console.log(topics)
     return (
        <section className="hotTopicWrapper">
            {hotTopics.map(topic => 
            <div key={topic.discussionid} className="hotTopics">
                <h5>Created by: <span className="topicUser">{topic.user}</span></h5>
                <h4>{topic.headline}</h4> 
                <div className="footer" >Posts on this topic: {topic.numberOfPosts}</div> 
            </div>
            
            ) }
        </section>
     )
}

export default HotTopics
