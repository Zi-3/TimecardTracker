
var moment = require("moment");
var DataLayer = require("./companydata/index.js");

//company as RIT username
var company = "zxc9821";

var dl = new DataLayer(company);

//module exports
module.exports = {
    checkCompany: function (company) {
        if (company != "zxc9821") {
            return "{ company - must be zxc9821 }";
        }
        return null;
    },
    checkDepartmentID: function (company, dept_id) {
        if (dl.getDepartment(company, dept_id) == null) {
            return "{ dept_id - must be an existing record number for a department }";
        }
        return null;
    },
    checkDepartmentNo: function (dept_no,dept_id) {
        var departments = dl.getAllDepartment(company);
        for (let dept of departments) {
            if ((dept.getDeptNo() == dept_no) && (dept_id != dept.getId())) {
                return " { dept_no - must be unique among all companies, Suggestion: include company name as part of id. } ";
            }
        }
        return null;
    },
    checkDepartmentIDandNo: function (company, dept_id, dept_no) {
        if (module.exports.checkDepartmentID(company, dept_id) != null) {
            return module.exports.checkDepartmentID(company, dept_id);
        }
        if (module.exports.checkDepartmentNo(dept_no,dept_id) != null) {
            return module.exports.checkDepartmentNo(dept_no,dept_id);
        }
        return null;

    },
    checkEmpolyeeNo: function (emp_no,emp_id) {
        var employee = dl.getAllEmployee(company);
        for (let emp of employee) {
            if ((emp.getEmpNo() == emp_no) && (emp_id != emp.getId())) {
                return "{ emp_no - must be unique. }";
            }
        }
        return null;

    },
    checkDateValidate: function (date) {
        var dateVali = moment(date)
        var now = moment();
        if (!(dateVali.isSameOrBefore(now))) {
            return "{ hire_date - must be a valid date equal to the current date or earlier(e.g. current date or in the past. }";
        }
        if (!(dateVali.day() > 0 && dateVali.day() < 6)) {
            return "{ hire_date - must be week days. }";
        }
        return null;

    },
    checkEmployeeID: function (emp_id) {
        if (dl.getEmployee(emp_id) == null && emp_id != 0) {
            return "{ emp_id - must be the record id of an existing Employee in your company. }";
        }
        return null;

    },
    checkEmployeeInput: function (company, date, dept_id, emp_no, mng_id,emp_id) {
        if (module.exports.checkCompany(company) != null) {
            return module.exports.checkCompany(company);
        }
        if (module.exports.checkEmployeeID(mng_id) != null) {
            return module.exports.checkEmployeeID(mng_id);
        }
        if (module.exports.checkDateValidate(date) != null) {
            return module.exports.checkDateValidate(date);
        }
        if (module.exports.checkDepartmentID(company, dept_id) != null) {
            return module.exports.checkDepartmentID(company, dept_id);
        }
        if (module.exports.checkEmpolyeeNo(emp_no,emp_id) != null) {
            return module.exports.checkEmpolyeeNo(emp_no,emp_id);
        }

        return null;
    },
    checkTimecardID: function (timecard_id) {
        if (dl.getTimecard(timecard_id) == null) {
            return "{ timecard_id - must be the record id of an existing timecard in your company. }";
        }
        return null;
    },
    checkTimeCardInput: function(company,emp_id){
        var timecard = dl.getAllTimecard(emp_id);
        if (timecard == null) {
            return "{ Please check the company name and the employee id for Timecard }";
         }
         return null;
    },
  
    checkTimeCard: function (start_time, end_time, emp_id,timecard_id) {
        var start = moment(start_time);
        var end = moment(end_time);
        var curDate = moment();
        var timecards = dl.getAllTimecard(emp_id);

        for (let tm of timecards) {
            var d = moment(tm.getStartTime());
            if (tm.getEmpId() == emp_id && start.isSame(d, 'day') && (tm.getId() != timecard_id)) {
                return "{ start_time - must not be on the same day as any other start_time for that employee. }";
                
            } 
            
        }

        if (curDate.week() != start.week()) {
            return "{ start_time - must be a valid date and time equal to the current date or up to 1 week ago from the current date }";
        }else if (!(start.day() > 0 && start.day() < 6)) {
            return "{ start_time must be a Monday, Tuesday, Wednesday, Thursday or a Friday. They cannot be Saturday or Sunday. }";
        }else if (!(end.day() > 0 && end.day() < 6)) {
            return "{ end_time must be a Monday, Tuesday, Wednesday, Thursday or a Friday. They cannot be Saturday or Sunday. }";
        }else if(!(start.isSame(end,'day'))){
            return "{ start_time and end_time - must on the same day.\""+"}";
        }else if(start.hour() < 8 || start.hour() >18 || (start.hour() == 18 &&(start.minute() > 0 || start.second() > 0))){
            return "{ start_time must be between the hours (in 24 hour format) of 08:00:00 and 18:00:00 inclusive. }";
        }else if(end.hour() < 8 || end.hour() >18 || (end.hour() == 18 && (end.minute() > 0 || end.second() > 0))){
            return "{ end_time must be between the hours (in 24 hour format) of 08:00:00 and 18:00:00 inclusive. }";
        }else if (!start.isBefore(end, 'hour')) {
            return "{  end_time - must be a valid date and time at least 1 hour greater than the start_time and be on the same day as the start_time }";
        }
        return null;
    },
    timecardCheck: function(company, start_time, end_time, emp_id, timecard_id){
        if (module.exports.checkCompany(company) != null) {
            return module.exports.checkCompany(company);
        }
        if (module.exports.checkEmployeeID(emp_id) != null) {
            return module.exports.checkEmployeeID(emp_id);
        }
        if (module.exports.checkTimeCard(start_time, end_time, emp_id,timecard_id) != null) {
            //console.log(module.exports.checkTimeCard(start_time, end_time, emp_id,timecard_id));
            return module.exports.checkTimeCard(start_time, end_time, emp_id,timecard_id);
        }
        return null;
    },
    checkTimeFormat: function (start_time, end_time){
        if(start_time.length != 19){
            return "Please enter the correct start time format (YYYY-MM-DD HH:MM:SS)";
        }
        if(end_time.length != 19){
            return "Please enter the correct end time format (YYYY-MM-DD HH:MM:SS)";
        }
        return null;
    },
    checkDateFormat: function (hire_date){
        if(hire_date.length != 10){
            return "Please enter the correct start time format (YYYY-MM-DD)";
        }
        return null;
    }
}