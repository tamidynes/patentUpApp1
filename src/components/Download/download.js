import Vue from 'vue'
import JsonExcel from 'json-to-excel';

Vue.component('downloadExcel', JsonExcel);

const excel = new Vue({
    el: '#excel',
    data: {
        json_fields : {
          "assignee_id": "number",
          "assignee_first_name": "string",
          "assignee_last_name": "string",
          "assignee_organization": "string",
          "assignee_total_num_patents": "number",
          "patents": "Array",
          "patent_number": "number"

        },
        json_data : jsonResponse.assignees,
        json_meta: [
            [{
                "key": "charset",
                "value": "utf-8"
            }]
        ],
    }
})

export default excel;
