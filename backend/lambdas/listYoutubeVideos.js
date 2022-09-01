const AWS = require('aws-sdk');

// Setup DynamoDB
const documentClient = new AWS.DynamoDB.DocumentClient(
    {
        region: 'us-east-1'
    }
);

// Function to list videos in DB
const listYoutubeVideos = async () => {
    
    const params = {
        TableName: 'videos'
    };
    
    try
    {
        const data = await documentClient.scan(params)
        .promise();
     
        // Get videos from data   
        const videos = data.Items;
        
        return videos;
    }
    catch(ex)
    {
        return null;
    }
}


// Main function
exports.handler = async (event) => {
    
    let response;
    
    const videos = await listYoutubeVideos();
    
    if(videos !== null)
    {
        response = {
            statusCode: 200,
            body: JSON.stringify(
                {
                    data: {
                        videos: videos        
                    }
                }
            )
        };
    }
    else
    {
        response = {
            statusCode: 500,
            body: JSON.stringify(
                {
                    error: {
                        message: "Fail on listing videos."        
                    }
                }
            )
        };
    }
    
    return response;
};