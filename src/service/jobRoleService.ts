import axios from 'axios'

export const deleteJobRole = async function(id: number): Promise<number> {
    try {
        const response = await axios.delete('http://localhost:8080/api/job-roles/' + id);

        return response.data;
    } catch (e) {
        throw new Error('Could not delete job role');
    }
}