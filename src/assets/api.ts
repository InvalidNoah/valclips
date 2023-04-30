const API_URL = 'https://valclips-db.hop.sh'; // change this to your API endpoint

// Submit a new video
async function submitVideo(author: string, videoId: string, turnstileResponse: string) {
    const formData = new FormData();
    formData.append('author', author);
    formData.append('video_id', videoId);
    formData.append('cf-turnstile-response', turnstileResponse);

    const response = await fetch(`${API_URL}/submit`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Failed to submit video: ${response.statusText}`);
    }

    return await response.text();
}

// Get clips for a specific author
async function getClipsByAuthor(author: string, startIndex: number, endIndex: number) {
    const response = await fetch(`${API_URL}/clips/${author}?startIndex=${startIndex}&endIndex=${endIndex}`);

    if (!response.ok) {
        throw new Error(`Failed to get clips: ${response.statusText}`);
    }

    return await response.json();
}

// Get all clips
async function getAllClips(startIndex: number, endIndex: number) {
    const response = await fetch(`${API_URL}/clips?startIndex=${startIndex}&endIndex=${endIndex}`);

    if (!response.ok) {
        throw new Error(`Failed to get clips: ${response.statusText}`);
    }

    return await response.json();
}

// Get approved clips
async function getApprovedClips(startIndex: number, endIndex: number) {
    const response = await fetch(`${API_URL}/clips-approved?startIndex=${startIndex}&endIndex=${endIndex}`);

    if (!response.ok) {
        throw new Error(`Failed to get approved clips: ${response.statusText}`);
    }

    return await response.json();
}

// Approve a video by ID
async function approveVideo(videoId: string, key: string) {
    const response = await fetch(`${API_URL}/approve/${videoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            key: key,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to approve video: ${response.statusText}`);
    }

    return await response.text();
}

// Delete a video by ID
async function deleteVideo(videoId: string, key: string) {
    const response = await fetch(`${API_URL}/delete/${videoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            key: key,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to delete video: ${response.statusText}`);
    }

    return await response.text();
}

// Search for a video by query
async function searchVideos(query: any, startIndex: number, endIndex: number) {
    const response = await fetch(`${API_URL}/search/${query}?startIndex=${startIndex}&endIndex=${endIndex}`);

    if (!response.ok) {
        throw new Error(`Failed to search videos: ${response.statusText}`);
    }

    return await response.json();
}

async function getVideoData(videoId: string): Promise<VideoData> {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    return {
        id: videoId,
        title: data.title,
        author_name: data.author_name,
        author_url: data.author_url,
        html: data.html,
        thumbnail_url: data.thumbnail_url,
        thumbnail_width: data.thumbnail_width,
        thumbnail_height: data.thumbnail_height,
    };
}

// Export all functions
export {
    submitVideo,
    getClipsByAuthor,
    getAllClips,
    getApprovedClips,
    approveVideo,
    deleteVideo,
    getVideoData,
    searchVideos
}
