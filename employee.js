const employee={template:`
<div>

<button type="button" 
    class="btn btn-primary m-2 fload-end"
    data-bs-toggle="modal" 
    data-bs-target="#exampleModal"
    @click="addClick()">
    Add Employee
</button>
<table class="table table-striped">
<thead>
    <tr>
        <th>
            Employee Id
        </th>
        <th>
            Employee Name
        </th>
        <th>
            Department
        </th>
        <th>
            DOJ
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        <tr v-for="emp in employees">
            <td>{{emp.EmployeeId}}</td>
            <td>{{emp.EmployeeName}}</td>
            <td>{{emp.Departament}}</td>
            <td>{{emp.DateOfJoining}}</td>
            <td>
                <button type="button" class="btn btn-light mr-1"  data-bs-toggle="modal" 
                data-bs-target="#exampleModal"
                @click="editClick(emp)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                <button type="button" @click="deleteClick(emp.EmployeeId)"  class="btn btn-light mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                </button>
            </td>
        </tr>
    </tbody>

</table>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-tittle" id="exampleModalLabel">{{modalTitle}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>

            <div class="modal-body">
            <div class="d-flex flex-row bd-highlight mb-3">
                <div class="p-2 w-50 bd-highlight">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Name </span>
                        <input type="text" class="form-control" v-model="EmployeeName">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">Department </span>
                        <select type="text" class="form-select" v-model="Departament">
                            <option v-for="dep in departments">
                            {{dep.DepartmentName}}
                            </option>
                        </select>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">DOJ </span>
                        <input type="date" class="form-control" v-model="DateOfJoining">
                    </div>
                </div>
                <div class="p-2 w-50 bd-highlight">
                    <img src="PhotoPath+PhotoFileName" width="250px" height="250px" />
                    <input class="m-2" type="file" @change="uploadImage">
                </div>
            </div>  
                
                <button type="button" @click="createClick"  v-if="EmployeeId==0" class="btn btn-primary">
                Create 
                </button>

                <button type="button" @click="updateClick" v-if="EmployeeId!=0" class="btn btn-primary">
                Update 
                </button>
            </div>

        </div>
    
    </div>
</div>
</div>
`,

data(){
    return {
        departments:[],
        employees:[],
        modalTitle:"",
        EmployeeId: 0,
        EmployeeName:"",
        Departament:"",
        DateOfJoining:"",
        PhotoFileName:"anonymous.png",
        PhotoPath: variables.PHOTO_URL
    }

},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"employee").then((response)=>{
            this.employees= response.data;
        }),
        axios.get(variables.API_URL+"department").then((response)=>{
            this.departments= response.data;
        })
    },
    addClick(){
        this.modalTitle="Add Employee";
        this.EmployeeId=0;
        this.EmployeeName="";
        this.Departament="";
        this.DateOfJoining="";
        this.PhotoFileName="anonymous.png";
    },
    editClick(emp){
        this.modalTitle="Edit Employee";
        this.EmployeeId=emp.EmployeeId;
        this.EmployeeName=emp.EmployeeName;
        this.Departament=emp.Departament;
        this.DateOfJoining=emp.DateOfJoining;
        this.PhotoFileName=emp.PhotoFileName;
    },

    createClick(){
        axios.post(variables.API_URL+"employee",{
            EmployeeName:this.EmployeeName,
            Departament: this.Departament,
            DateOfJoining: this.DateOfJoining,
            PhotoFileName: this.PhotoFileName
        }).then((response)=>{
            this.refreshData();
            alert(response.data);
            
        })
    },
    updateClick(){
        axios.put(variables.API_URL+"employee",{
            EmployeeId: this.EmployeeId,
            EmployeeName:this.EmployeeName,
            Departament: this.Departament,
            DateOfJoining: this.DateOfJoining,
            PhotoFileName: this.PhotoFileName
        }).then((response)=>{
            this.refreshData();
            alert(response.data);
            
        })

    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(variables.API_URL+"employee/"+id).then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },

    uploadImage(event){
        let formData= new FormData();
        formData.append('file', event.target.files[0]);
        axios.post(variables.API_URL+"employee/savefile", formData).then((response)=>{
            this.PhotoFileName=response.data
        });
    }

},


mounted: function(){
    this.refreshData();
}
}
