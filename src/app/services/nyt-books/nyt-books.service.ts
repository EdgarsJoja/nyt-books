import { Injectable } from '@angular/core';

import { ConfigService } from '../config/config.service';
import { ApiService } from '../api/api.service';

interface ApiConfigInterface {
    base_url: string;
    api_key: string;
    api_format: string;
    path_lists_names: string;
    path_lists: string;
    path_reviews;
}

export interface ApiResponseInterface {
    results: Array<any>;
}

@Injectable()
export class NytBooksService {
    /**
     * Config key for API service
     */
    private configKey = 'nyt-api';

    private config = {} as ApiConfigInterface;

    constructor(private apiService: ApiService, private configService: ConfigService) {
        this.config = this.configService.getConfig(this.configKey);
    }

    /**
     * public getListsNamesApiUrl - Build lists names API url
     *
     * @return {type}  description
     */
    public getListsNamesApiUrl() {
        return `${this.config.base_url}${this.config.path_lists_names}`;
    }

    /**
     * Build url for list data API
     *
     * @returns {string}
     */
    public getListsApiUrl() {
        return `${this.config.base_url}${this.config.path_lists}`;
    }

    /**
     * public getApiData - Get data from api
     *
     * @param {string} url
     * @param params
     * @returns {Observable<Object>}
     */
    public getApiData(url: string, params = {}) {
        return this.apiService.getApiData(url, Object.assign({
            'api-key': this.config.api_key
        }, params));
    }
}
