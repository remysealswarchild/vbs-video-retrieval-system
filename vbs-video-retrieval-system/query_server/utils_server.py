import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import re
import string
from typing import List

def parse_json_field(field_value):
    """Parse a JSON string or return as-is if already parsed."""
    if not field_value:
        return []
    if isinstance(field_value, str):
        try:
            return json.loads(field_value)
        except:
            return []
    return field_value

def color_distance(color1, color2):
    """Weighted Euclidean distance in RGB space based on human perception."""
    if not color1 or not color2 or len(color1) != 3 or len(color2) != 3:
        return float('inf')
    r_diff = (color1[0] - color2[0]) * 0.3
    g_diff = (color1[1] - color2[1]) * 0.59
    b_diff = (color1[2] - color2[2]) * 0.11
    return (r_diff**2 + g_diff**2 + b_diff**2)**0.5

def cosine_similarity_score(embedding1, embedding2):
    """Compute cosine similarity between two embedding vectors."""
    if not embedding1 or not embedding2:
        return 0.0
    try:
        emb1 = np.array(embedding1).reshape(1, -1)
        emb2 = np.array(embedding2).reshape(1, -1)
        return float(np.dot(emb1, emb2.T) / (np.linalg.norm(emb1) * np.linalg.norm(emb2)))
    except Exception:
        return 0.0

def extract_keywords_from_sentence(sentence: str) -> List[str]:
    """
    Extract meaningful keywords from a sentence by:
    1. Converting to lowercase
    2. Removing punctuation
    3. Splitting into words
    4. Filtering out common stop words
    5. Removing very short words (less than 2 characters)
    
    Args:
        sentence (str): Input sentence from user
        
    Returns:
        List[str]: List of extracted keywords
    """
    # Common English stop words to filter out
    stop_words = {
        'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 
        'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 
        'with', 'the', 'this', 'but', 'they', 'have', 'had', 'what', 'said', 'each', 
        'which', 'she', 'do', 'how', 'their', 'if', 'up', 'out', 'many', 'then', 
        'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'into', 'him', 
        'time', 'two', 'more', 'go', 'no', 'way', 'could', 'my', 'than', 'first', 
        'been', 'call', 'who', 'its', 'now', 'find', 'long', 'down', 'day', 'did', 
        'get', 'come', 'made', 'may', 'part', 'i', 'me', 'my', 'myself', 'we', 'our', 
        'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 
        'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 
        'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 
        'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 
        'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'will', 
        'would', 'should', 'could', 'can', 'may', 'might', 'must', 'shall', 'ought',
        'over', 'under', 'above', 'below', 'between', 'among', 'through', 'during',
        'before', 'after', 'since', 'until', 'while', 'where', 'when', 'why', 'how'
    }
    
    # Convert to lowercase and remove punctuation
    sentence = sentence.lower()
    sentence = re.sub(r'[^\w\s]', ' ', sentence)
    
    # Split into words and filter
    words = sentence.split()
    keywords = []
    
    for word in words:
        # Remove extra whitespace and check length
        word = word.strip()
        if len(word) >= 2 and word not in stop_words:
            keywords.append(word)
    
    return keywords
