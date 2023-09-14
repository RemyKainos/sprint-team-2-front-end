import {JobRole} from "../model/JobRole"

const axios = require('axios');

module.exports.viewJobRoles = async function (): Promise<JobRole []> {
    try{
        const response = await axios.get('http://localhost:8080/api/job-roles')
        return response.data
    } catch(e) {
        throw new Error('Could not fetch job roles')
    }
}