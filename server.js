var express = require("express");
var dateVal = require("moment");
var business = require("./businessLayer.js")
var app = express();

app.use(express.json());
var urlencodedParser = app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || process.env.NODE_PORT || 8080;

var DataLayer = require("./companydata/index.js");
var dl = new DataLayer("zxc9821");
var response = "";

app.delete('/CompanyServices/company', function (req, res, next) {
    try {
        company = req.query.company;
        dl = new DataLayer(company);
        var row = dl.deleteCompany(company);
        if (row <= 0) {
            response = { error: "Company not found." };
        } else {
            response = { success: company + "'s info deleted." };
        }
    } catch (e) {
        response = { error: e.toString()};
    } 
    res.send(JSON.stringify(response));
});

app.get('/CompanyServices/departments', function (req, res, next) {
    try {
        company = req.query.company;
        dl = new DataLayer(company);
        var departments = dl.getAllDepartment(company);
        var d_list = [];
        for (let d of departments) {
            dept = {
                dept_id: d.getId(),
                company: d.getCompany(),
                dept_name: d.getDeptName(),
                dept_no: d.getDeptNo(),
                location: d.getLocation()
            }
            d_list.push(dept)
        }
        response = d_list;
    } catch (e) {
        response = { error: "departments error." };
    }
    res.send(JSON.stringify(response));
});


app.get('/CompanyServices/department', function (req, res, next) {
    try {
        company = req.query.company;
        dept_id = req.query.dept_id;
        var d = dl.getDepartment(company, dept_id);
        if (d != null) {
            response = {
                dept_id: d.getId(),
                company: d.getCompany(),
                dept_name: d.getDeptName(),
                dept_no: d.getDeptNo(),
                location: d.getLocation()
            }
        } else {
            response = { error: "{ Please check company name and department ID! }" }
        }
    } catch (e) {
        response = { error: "department dept_id error: " + dept_id + "." };
    }
    res.send(JSON.stringify(response));
});


app.post('/CompanyServices/department', function (req, res, next) {
    try {
        var company = req.body.company;
        var dept_name = req.body.dept_name;
        var dept_no = req.body.dept_no;
        var location = req.body.location;
        var deptCheck = business.checkDepartmentNo(req.body.dept_no);

        if (deptCheck == null) {
            dl = new DataLayer(company);
            var d = new dl.Department(company, dept_name, dept_no, location);
            d = dl.insertDepartment(d);
            if (d != null) {
                response =
                {
                    sucess:
                    {
                        dept_id: d.getId(),
                        company: d.getCompany(),
                        dept_name: d.getDeptName(),
                        dept_no: d.getDeptNo(),
                        location: d.getLocation()
                    }
                };
            } else {
                response = { error: "Department not inserted." };
            }
        } else {
            response = deptCheck;
        }

    } catch (e) {
        response = { error: e.toString() };
    }
    res.send(JSON.stringify(response));
});



app.put('/CompanyServices/department', function (req, res, next) {
    try {
        var company = req.body.company;
        var dept_id = parseInt(req.body.dept_id);
        var dept_name = req.body.dept_name;
        var location = req.body.location;
        var dept_no = req.body.dept_no;
        var checkBoth = business.checkDepartmentIDandNo(company, dept_id, dept_no);
        if (checkBoth == null) {
            var dept = dl.getDepartment(company, dept_id);
            dept.setDeptName(dept_name);
            dept.setDeptNo(dept_no);
            dept.setLocation(location);
            var d = dl.updateDepartment(dept);
            response =
            {
                sucess:
                {
                    dept_id: d.getId(),
                    company: d.getCompany(),
                    dept_name: d.getDeptName(),
                    dept_no: d.getDeptNo(),
                    location: d.getLocation()
                }
            };
        } else {
            response = { error: checkBoth };
        }

    } catch (e) {
        response = { error: e.toString() };
    }
    res.send(JSON.stringify(response));
});

app.delete('/CompanyServices/department', function (req, res, next) {
    try {
        company = req.query.company;
        dept_id = req.query.dept_id;
        var row = dl.deleteDepartment(company, dept_id);
        if (row <= 0) {
            response = { error: "Department " + dept_id + " from " + company + " is not found." };
        } else {
            response = { success: "Department " + dept_id + " from " + company + " is deleted." };
        }
    } catch (e) {
        response = { error: e.toString() };
    } 
    res.send(JSON.stringify(response));
});

app.get('/CompanyServices/employees', function (req, res, next) {
    try {
        company = req.query.company;
        dl = new DataLayer(company);
        var employees = dl.getAllEmployee(company);
        var e_list = [];
        for (let e of employees) {
            emp = {
                emp_id: e.getId(),
                emp_name: e.getEmpName(),
                emp_no: e.getEmpNo(),
                hire_date: e.getHireDate(),
                job: e.getJob(),
                salary: e.getSalary(),
                dept_id: e.getDeptId(),
                mng_id: e.getMngId()
            };
            e_list.push(emp);
        }
        response = e_list;
    } catch (e) {
        response = { error: "employees not found." };
    } 

    res.send(response);
});


app.get('/CompanyServices/employee', function (req, res, next) {
    try {
        company = req.query.company;
        emp_id = parseInt(req.query.emp_id);
        var e = dl.getEmployee(emp_id);
        if (e != null) {
            response = {
                emp_id: e.getId(),
                emp_name: e.getEmpName(),
                emp_no: e.getEmpNo(),
                hire_date: e.getHireDate(),
                job: e.getJob(),
                salary: e.getSalary(),
                dept_id: e.getDeptId(),
                mng_id: e.getMngId()
            };
        } else {
            response = { error: "{ Please check company name and employee ID! }" }
        }
    } catch (e) {
        response = { error: e.toString() };
    }
    res.send(JSON.stringify(response));
});


app.post('/CompanyServices/employee', function (req, res, next) {
    try {
        var company = req.body.company;
        var emp_name = req.body.emp_name;
        var emp_no = req.body.emp_no;
        var hire_date = req.body.hire_date;
        var job = req.body.job;
        var salary = parseFloat(req.body.salary);
        var dept_id = parseInt(req.body.dept_id);
        var mng_id = parseInt(req.body.mng_id);
        if (business.checkEmployeeID(mng_id) != null) {
            mng_id = 0;
        }
        var checkInput = business.checkEmployeeInput(company, hire_date, dept_id, emp_no, mng_id);

        if (checkInput == null) {
            dl = new DataLayer(company);
            var e = dl.insertEmployee(new dl.Employee(emp_name, emp_no, hire_date, job, salary, dept_id, mng_id));
            response =
            {
                sucess:
                {
                    emp_id: e.getId(),
                    emp_name: e.getEmpName(),
                    emp_no: e.getEmpNo(),
                    hire_date: e.getHireDate(),
                    job: e.getJob(),
                    salary: e.getSalary(),
                    dept_id: e.getDeptId(),
                    mng_id: e.getMngId()
                }
            };
        } else {
            response = { error: checkInput };
        }

    } catch (e) {
        response = { error: e.toString() };
    }
    res.send(JSON.stringify(response));
});


app.put('/CompanyServices/employee', function (req, res, next) {
    try {
        var company = req.body.company;
        var emp_name = req.body.emp_name;
        var emp_id = parseInt(req.body.emp_id);
        var hire_date = req.body.hire_date;
        var job = req.body.job;
        var emp_no = req.body.emp_no;
        var salary = parseFloat(req.body.salary);
        var dept_id = parseInt(req.body.dept_id);
        var mng_id = parseInt(req.body.mng_id);
        if (!business.checkEmployeeID(mng_id)) {
            mng_id = 0;
        }
        if (business.checkDateFormat(hire_date) != null) {
            res.send(JSON.stringify({ error: business.checkDateFormat(hire_date) }));
            return;
        }
        
        var checkInput = business.checkEmployeeInput(company, hire_date, dept_id, emp_no, mng_id,emp_id);
        console.log(checkInput);
        if (checkInput == null) {

            dl = new DataLayer(company);
            var e = dl.getEmployee(emp_id);
            e.setEmpName(emp_name);
            e.setEmpNo(emp_no);
            e.setHireDate(hire_date);
            e.setJob(job);
            e.setSalary(salary);
            e.setDeptId(dept_id);
            e.setMngId(mng_id);
            e = dl.updateEmployee(e);
            response =
            {
                sucess:
                {
                    emp_id: e.getId(),
                    emp_name: e.getEmpName(),
                    emp_no: e.getEmpNo(),
                    hire_date: e.getHireDate(),
                    job: e.getJob(),
                    salary: e.getSalary(),
                    dept_id: e.getDeptId(),
                    mng_id: e.getMngId()
                }
            };
        } else {
            response = { error: checkInput }
        }
    } catch (e) {
        response = { error: e.toString() };
    }
    res.send(JSON.stringify(response));
});

app.delete('/CompanyServices/employee', function (req, res, next) {
    try {
        company = req.query.company;
        emp_id = req.query.emp_id;
        dl = new DataLayer(company);
        var row = dl.deleteEmployee(emp_id);
        if (row <= 0) {
            response = { error: "Employee " + emp_id + " is not found."  };
        } else {
            response = { success: "Employee " + emp_id + " is deleted." };
        }
    } catch (e) {
        response = { error: e.toString() };
    } 
    res.send(JSON.stringify(response));
});

app.get('/CompanyServices/timecards', function (req, res, next) {
    try {
        company = req.query.company;
        emp_id = req.query.emp_id;
        dl = new DataLayer(company);
        var check = business.checkTimeCardInput(company, emp_id);
        if (check == null) {
            var timecards = dl.getAllTimecard(emp_id);
            var t_list = [];
            for (let t of timecards) {
                timecard = {
                    timecard_id: t.getId(),
                    start_time: t.getStartTime(),
                    end_time: t.getEndTime(),
                    emp_id: t.getEmpId()
                };
                t_list.push(timecard);
            }
            response = t_list;
        } else {
            response = { error: check };
        }
    } catch (e) {
        response = { error: e.toString() };
    }
    res.send(response);
});

app.get('/CompanyServices/timecard', function (req, res, next) {
    try {
        company = req.query.company;
        timecard_id = parseInt(req.query.timecard_id);
        var t = dl.getTimecard(timecard_id);
        if (t != null) {

            response = {
                timecard_id: t.getId(),
                start_time: t.getStartTime(),
                end_time: t.getEndTime(),
                emp_id: t.getEmpId()
            };
        } else {
            response = { error: "timecard_id not found." }
        }
    } catch (e) {
        response = { error: e.toString() };
    }
    res.send(JSON.stringify(response));
});

app.post('/CompanyServices/timecard', function (req, res, next) {
    try {
        var company = req.body.company;
        var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var emp_id = parseInt(req.body.emp_id);
        var check = business.timecardCheck(company, start_time, end_time, emp_id, -1);

        if (check == null) {

            var time = new dl.Timecard(start_time, end_time, emp_id);
            var t = dl.insertTimecard(time);
            response =
            {
                sucess:
                {
                    timecard_id: t.getId(),
                    start_time: t.getStartTime(),
                    end_time: t.getEndTime(),
                    emp_id: t.getEmpId()
                }
            };
        } else {
            response = { error: "else" + check };
        }

    } catch (e) {
        response = { error: e.toString() };
    }
    res.send(JSON.stringify(response));
});

app.put('/CompanyServices/timecard', function (req, res, next) {
    try {

        var company = req.body.company;
        var timecard_id = req.body.timecard_id;
        var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var emp_id = parseInt(req.body.emp_id);

        if (business.checkTimeFormat(start_time, end_time) != null) {
            res.send(JSON.stringify({ error: business.checkTimeFormat(start_time, end_time) }));
            return;
        }

        if (business.checkTimecardID(timecard_id) != null) {
            response = { error: business.checkTimecardID(timecard_id) };
        }
        var check = business.timecardCheck(company, start_time, end_time, emp_id, timecard_id);
        if (check == null) {
            dl = new DataLayer(company);
            var time = dl.getTimecard(timecard_id);
            time.setEmpId(emp_id);
            time.setStartTime(start_time);
            time.setEndTime(end_time);
            var t = dl.updateTimecard(time);
            response =
            {
                sucess:
                {
                    timecard_id: t.getId(),
                    start_time: t.getStartTime(),
                    end_time: t.getEndTime(),
                    emp_id: t.getEmpId()
                }
            };

        } else {
            response = { error: check };
        }
    } catch (e) {
        response = { error: e.toString() };
    }
    res.send(JSON.stringify(response));
});

app.delete('/CompanyServices/timecard', function (req, res, next) {
    try {
        company = req.query.company;
        timecard_id = req.query.timecard_id;
        var row = dl.deleteTimecard(timecard_id);
        if (row <= 0) {
            response = { error: "timecard_id not found." };
        } else {
            response = { success: "Timecard " + timecard_id + " is deleted." };
        }
    } catch (e) {
        response = { error: "Error in deletion." };
    }
    res.send(JSON.stringify(response));
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
});

console.log(`Listening on 127.0.0.1: ${port}`);