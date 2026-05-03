import { useEffect, useState, useCallback } from 'react'

const SummaryCard = ({ post, comments }) => {
    const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY;
    const LLM_ENDPOINT = import.meta.env.VITE_LLM_ENDPOINT;
    const [summary, setSummary] = useState('');
    const fetchSummary = useCallback(async () => {
        if (!post || !post.id || !post.title || !post.content) {
            return;
        }

        const commentsText = comments && comments.length > 0 
                ? comments.map(comment => comment.content).join('; ')
                : 'No comments yet';

        const response = await fetch(LLM_ENDPOINT + 'api/v1/messages', {
            method: "POST",
            body: JSON.stringify({
                model: "openai/gemma4:26b",
                messages: [
                    {
                        role: "user",
                        content: `Summarize this Music Recommedation post. It includes
                            the name of the track or album "${post.title}", the content from the posting user "${post.content}",
                            an image URL "${post.image_url}", the amount of upvotes "${post.upvotes}", and a list of the comments "${commentsText}".
                            Please also comment on image provided.
                        Respond ONLY in JSON format: {"summary": "string"}`,
                    }
                ]
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${LLM_API_KEY}`,
            },
        });
        let aiResult = await response.json();
        aiResult = aiResult["content"][0]["text"];
        let cleanJson = aiResult.trim();
        if (cleanJson.startsWith("```")) cleanJson = cleanJson.slice(3);
        if (cleanJson.startsWith("json")) cleanJson = cleanJson.slice(4);
        if (cleanJson.endsWith("```")) cleanJson = cleanJson.slice(0, -3);
        let parsedResult = JSON.parse(cleanJson);
        if (parsedResult.content) parsedResult = JSON.parse(parsedResult.content);
        setSummary(parsedResult.summary);
    }, [post, comments, LLM_ENDPOINT, LLM_API_KEY]);

    useEffect(() => {
        fetchSummary();
    }, [post, comments]);

    return (
        
        <div className="summary-card">
            <h2>Summary</h2>
            {summary === ""? (<p>Loading LLM Generated Summary...</p>): (<p>{summary}</p>)}
        </div>
    )

}
export default SummaryCard