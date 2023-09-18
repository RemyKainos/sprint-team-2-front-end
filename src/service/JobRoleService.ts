import {JobRole} from "../model/JobRole"
import {ResponseError} from "../error/ResponseError"

const axios = require('axios');

module.exports.viewJobRoles = async function (): Promise<JobRole []> {
    try{
        const response = await axios.get('http://localhost:8080/api/job-roles')
        return response.data
    } catch(e) {
        const error = new ResponseError('Could not fetch job roles', 500)
        throw error;

    }
}
