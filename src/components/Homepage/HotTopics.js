import React from 'react'
import './overlay.css'
import './homepage.css'

const HotTopics = (props) => {

    const topics = props.filteredTopics
    const sortedTopics = topics.sort((firstItem, secondItem) => secondItem.numberOfPosts - firstItem.numberOfPosts )
    const hotTopics = sortedTopics.slice(0, 3)

    console.log(topics)
     return (
        <section>
            {hotTopics.map(topic => 
            <div key={topic.discussionid} className="hotTopics">
            <div >{topic.headline}</div> 
            <div >{topic.numberOfPosts}</div> 
            <div >{topic.user}</div> 
            </div>
            
            ) }
        </section>
     )
}

export default HotTopics
