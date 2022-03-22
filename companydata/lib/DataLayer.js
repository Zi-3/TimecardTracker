var _0x59b1 = [
  "emp_no",
  "job",
  "n/a",
  "SELECT\x20*\x20FROM\x20employee\x20LEFT\x20JOIN\x20department\x20USING(dept_id)\x20WHERE\x20department.company\x20=\x20?",
  "getEmployee",
  "emp_id",
  "UPDATE\x20employee\x20SET\x20emp_name\x20=\x20?,\x20emp_no\x20=\x20?,\x20hire_date\x20=\x20?,\x20job\x20=\x20?,\x20salary\x20=\x20?,\x20dept_id\x20=\x20?,\x20mng_id\x20=\x20?\x20WHERE\x20emp_id\x20=\x20?",
  "insertTimecard",
  "start_time",
  "split",
  "end_time",
  "INSERT\x20INTO\x20timecard\x20(start_time,\x20end_time,\x20emp_id\x20)\x20VALUES\x20(?,\x20?,\x20?)",
  "SELECT\x20*\x20FROM\x20timecard\x20WHERE\x20timecard_id\x20=\x20?",
  "YYYY-MM-DD\x20HH:mm:ss",
  "timecard_id",
  "SELECT\x20*\x20FROM\x20timecard\x20where\x20emp_id\x20=\x20?",
  "getTimecard",
  "updateTimecard",
  "UPDATE\x20timecard\x20SET\x20start_time\x20=\x20?,\x20end_time\x20=\x20?\x20WHERE\x20timecard_id\x20=\x20?",
  "DELETE\x20from\x20timecard\x20WHERE\x20timecard_id\x20=\x20?",
  "exports",
  "./department",
  "./employee",
  "./timecard",
  "undefined",
  "companyDB",
  "_company",
  "connection",
  "bdfvks-docker.ist.rit.edu",
  "576",
  "prototype",
  "Department",
  "Employee",
  "Timecard",
  "isValidDate",
  "getTime",
  "toISOString",
  "slice",
  "validateTime",
  "([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])",
  "test",
  "deleteCompany",
  "date-fns/format",
  "length",
  "getAllEmployee",
  "mgr\x20delete",
  "YYYY-MM-DD",
  "delete",
  "dept_id",
  "insertEmployee",
  "updateEmployee",
  "getAllTimecard",
  "deleteTimecard",
  "getId",
  "deleteEmployee",
  "deleteDepartment",
  "getAllDepartment",
  "query",
  "map",
  "company",
  "dept_name",
  "dept_no",
  "location",
  "getDepartment",
  "SELECT\x20*\x20FROM\x20department\x20WHERE\x20dept_no\x20=\x20?\x20AND\x20company\x20=\x20?",
  "insertDepartment",
  "INSERT\x20INTO\x20department\x20(company,\x20dept_name,\x20dept_no,\x20location\x20)\x20VALUES\x20(?,\x20?,\x20?,\x20?)",
  "SELECT\x20*\x20FROM\x20department\x20WHERE\x20dept_id\x20=\x20?",
  "insertId",
  "log",
  "affectedRows",
  "hire_date",
  "INSERT\x20INTO\x20employee\x20(emp_name,\x20emp_no,\x20hire_date,\x20job,\x20salary,\x20dept_id,\x20mng_id\x20)\x20VALUES\x20(?,\x20?,\x20?,\x20?,\x20?,\x20?,\x20?)",
  "emp_name",
  "salary",
  "mng_id",
  "SELECT\x20*\x20FROM\x20employee\x20WHERE\x20emp_id\x20=\x20?"
];
(function(_0x4abf60, _0x15f8c3) {
  var _0x57a99a = function(_0x447293) {
    while (--_0x447293) {
      _0x4abf60["push"](_0x4abf60["shift"]());
    }
  };
  _0x57a99a(++_0x15f8c3);
})(_0x59b1, 0xfc);
var _0xb64a = function(_0x104774, _0x44810e) {
  _0x104774 = _0x104774 - 0x0;
  var _0x9906fa = _0x59b1[_0x104774];
  return _0x9906fa;
};
("use strict");
var MySql = require("sync-mysql");
var Department = require(_0xb64a("0x0"));
var Employee = require(_0xb64a("0x1"));
var Timecard = require(_0xb64a("0x2"));
var DataLayer = function(_0x146eec) {
  if (!(this instanceof DataLayer) || typeof _0x146eec === _0xb64a("0x3")) {
    throw new Error(
      "DataLayer\x20needs\x20to\x20be\x20called\x20with\x20the\x20new\x20keyword\x20and\x20with\x20a\x20company"
    );
  }
  this[_0xb64a("0x4")] = _0x146eec + _0xb64a("0x5");
  this[_0xb64a("0x6")] = new MySql({
    host: _0xb64a("0x7"),
    user: _0xb64a("0x8"),
    password: _0xb64a("0x8"),
    database: this["companyDB"]
  });
};
DataLayer[_0xb64a("0x9")][_0xb64a("0xa")] = require(_0xb64a("0x0"));
DataLayer[_0xb64a("0x9")][_0xb64a("0xb")] = require(_0xb64a("0x1"));
DataLayer[_0xb64a("0x9")][_0xb64a("0xc")] = require(_0xb64a("0x2"));
DataLayer["prototype"][_0xb64a("0xd")] = function isValidDate(_0x5963e5) {
  var _0x5c0654 = /^\d{4}-\d{2}-\d{2}$/;
  if (!_0x5963e5["match"](_0x5c0654)) return ![];
  var _0xca4179 = new Date(_0x5963e5);
  if (!_0xca4179[_0xb64a("0xe")]() && _0xca4179[_0xb64a("0xe")]() !== 0x0)
    return ![];
  return _0xca4179[_0xb64a("0xf")]()[_0xb64a("0x10")](0x0, 0xa) === _0x5963e5;
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x11")] = function validateTime(_0x32e756) {
  var _0x303667 = new RegExp(_0xb64a("0x12"));
  if (_0x303667[_0xb64a("0x13")](_0x32e756)) {
    return !![];
  } else {
    return ![];
  }
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x14")] = function(_0x2c806a) {
  const _0x5687d8 = require(_0xb64a("0x15"));
  if (
    !_0x2c806a ||
    _0x2c806a[_0xb64a("0x16")] === 0x0 ||
    /^\s*$/["test"](_0x2c806a)
  ) {
    _0x2c806a = "n/a";
  }
  var _0x56363f = 0x0;
  var _0x3d0da3 = this["getAllDepartment"](_0x2c806a);
  var _0x4a9a46 = this[_0xb64a("0x17")](_0x2c806a);
  if (_0x4a9a46[_0xb64a("0x16")] > 0x0) {
    var _0x25385b = new Employee(
      _0xb64a("0x18"),
      "mgr\x20delete",
      _0x5687d8(new Date(), _0xb64a("0x19")),
      _0xb64a("0x1a"),
      0x0,
      _0x4a9a46[0x0][_0xb64a("0x1b")],
      null,
      null
    );
    _0x25385b = this[_0xb64a("0x1c")](_0x25385b);
    var _0x553029 = _0x25385b["getId"]();
    for (var _0x5403dd of _0x4a9a46) {
      if (_0x5403dd["getId"]() != _0x553029) {
        _0x5403dd["setMngId"](_0x553029);
        this[_0xb64a("0x1d")](_0x5403dd);
        var _0x4146c8 = this[_0xb64a("0x1e")](_0x5403dd["getId"]());
        for (var _0x2603f2 of _0x4146c8) {
          this[_0xb64a("0x1f")](_0x2603f2[_0xb64a("0x20")]());
          _0x56363f++;
        }
      }
    }
    _0x4a9a46 = this[_0xb64a("0x17")](_0x2c806a);
    for (var _0x5403dd of _0x4a9a46) {
      if (_0x5403dd[_0xb64a("0x20")]() != _0x553029) {
        this[_0xb64a("0x21")](_0x5403dd[_0xb64a("0x20")]());
        _0x56363f++;
      }
    }
    this[_0xb64a("0x21")](_0x553029);
    _0x56363f++;
  }
  for (var _0x37d46d of _0x3d0da3) {
    this[_0xb64a("0x22")](_0x2c806a, _0x37d46d[_0xb64a("0x20")]());
    _0x56363f++;
  }
  return _0x56363f;
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x23")] = function(_0x250cc6) {
  if (
    !_0x250cc6 ||
    _0x250cc6[_0xb64a("0x16")] === 0x0 ||
    /^\s*$/[_0xb64a("0x13")](_0x250cc6)
  ) {
    _0x250cc6 = "n/a";
  }
  var _0x527ac1 = this[_0xb64a("0x6")][_0xb64a("0x24")](
    "SELECT\x20*\x20FROM\x20department\x20WHERE\x20company\x20=\x20?",
    [_0x250cc6]
  );
  return _0x527ac1[_0xb64a("0x25")](
    _0x26f8b1 =>
      new Department(
        _0x26f8b1[_0xb64a("0x26")],
        _0x26f8b1[_0xb64a("0x27")],
        _0x26f8b1[_0xb64a("0x28")],
        _0x26f8b1[_0xb64a("0x29")],
        _0x26f8b1[_0xb64a("0x1b")]
      )
  );
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x2a")] = function(_0x45cd18, _0x4f1cd5) {
  if (!_0x4f1cd5 || !_0x45cd18) return null;
  var _0x53e0d9 = this[_0xb64a("0x6")][_0xb64a("0x24")](
    "SELECT\x20*\x20FROM\x20department\x20WHERE\x20dept_id\x20=\x20?\x20AND\x20company\x20=\x20?",
    [_0x4f1cd5, _0x45cd18]
  );
  if (_0x53e0d9[_0xb64a("0x16")] == 0x1) {
    return new Department(
      _0x53e0d9[0x0]["company"],
      _0x53e0d9[0x0]["dept_name"],
      _0x53e0d9[0x0][_0xb64a("0x28")],
      _0x53e0d9[0x0][_0xb64a("0x29")],
      _0x53e0d9[0x0][_0xb64a("0x1b")]
    );
  } else {
    return null;
  }
};
DataLayer["prototype"]["getDepartmentNo"] = function(_0xa1c159, _0x567293) {
  if (!_0x567293 || !_0xa1c159) return null;
  var _0x4b9412 = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x2b"), [
    _0x567293,
    _0xa1c159
  ]);
  if (_0x4b9412[_0xb64a("0x16")] == 0x1) {
    return new Department(
      _0x4b9412[0x0][_0xb64a("0x26")],
      _0x4b9412[0x0][_0xb64a("0x27")],
      _0x4b9412[0x0][_0xb64a("0x28")],
      _0x4b9412[0x0][_0xb64a("0x29")],
      _0x4b9412[0x0][_0xb64a("0x1b")]
    );
  } else {
    return null;
  }
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x2c")] = function(_0x39325b) {
  try {
    var _0x26f190 = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x2d"), [
      _0x39325b["company"],
      _0x39325b[_0xb64a("0x27")],
      _0x39325b[_0xb64a("0x28")],
      _0x39325b[_0xb64a("0x29")]
    ]);
    _0x26f190 = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x2e"), [
      _0x26f190[_0xb64a("0x2f")]
    ]);
    return new Department(
      _0x26f190[0x0][_0xb64a("0x26")],
      _0x26f190[0x0]["dept_name"],
      _0x26f190[0x0][_0xb64a("0x28")],
      _0x26f190[0x0][_0xb64a("0x29")],
      _0x26f190[0x0][_0xb64a("0x1b")]
    );
  } catch (_0x5b1073) {
    console[_0xb64a("0x30")](_0x5b1073);
    return null;
  }
};
DataLayer["prototype"]["updateDepartment"] = function(_0x3e4bfb) {
  try {
    var _0x188e74 = this[_0xb64a("0x6")][_0xb64a("0x24")](
      "UPDATE\x20department\x20SET\x20dept_name\x20=\x20?,\x20dept_no\x20=\x20?,\x20location\x20=\x20?\x20WHERE\x20dept_id\x20=\x20?",
      [
        _0x3e4bfb[_0xb64a("0x27")],
        _0x3e4bfb["dept_no"],
        _0x3e4bfb["location"],
        _0x3e4bfb[_0xb64a("0x1b")]
      ]
    );
    _0x188e74 = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x2e"), [
      _0x3e4bfb[_0xb64a("0x1b")]
    ]);
    if (_0x188e74[_0xb64a("0x16")] == 0x1) {
      return new Department(
        _0x188e74[0x0][_0xb64a("0x26")],
        _0x188e74[0x0]["dept_name"],
        _0x188e74[0x0][_0xb64a("0x28")],
        _0x188e74[0x0][_0xb64a("0x29")],
        _0x188e74[0x0][_0xb64a("0x1b")]
      );
    } else {
      return null;
    }
  } catch (_0x297711) {
    console[_0xb64a("0x30")](_0x297711);
    return null;
  }
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x22")] = function(_0x52eb66, _0x284792) {
  try {
    var _0x571c1f = this[_0xb64a("0x6")][_0xb64a("0x24")](
      "DELETE\x20from\x20department\x20WHERE\x20dept_id\x20=\x20?\x20AND\x20company\x20=\x20?",
      [_0x284792, _0x52eb66]
    );
    return _0x571c1f[_0xb64a("0x31")];
  } catch (_0x22dc56) {
    console["log"](_0x22dc56);
    return 0x0;
  }
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x1c")] = function(_0x3b6cf2) {
  if (
    !_0x3b6cf2["hire_date"] ||
    !this[_0xb64a("0xd")](_0x3b6cf2[_0xb64a("0x32")])
  ) {
    return null;
  }
  try {
    var _0x12c780 = this["connection"]["query"](_0xb64a("0x33"), [
      _0x3b6cf2[_0xb64a("0x34")],
      _0x3b6cf2["emp_no"],
      _0x3b6cf2["hire_date"],
      _0x3b6cf2["job"],
      _0x3b6cf2[_0xb64a("0x35")],
      _0x3b6cf2[_0xb64a("0x1b")],
      _0x3b6cf2[_0xb64a("0x36")]
    ]);
    _0x12c780 = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x37"), [
      _0x12c780[_0xb64a("0x2f")]
    ]);
    var _0x5efec0 = new Date(_0x12c780[0x0][_0xb64a("0x32")]);
    var _0x10f586 = _0x5efec0[_0xb64a("0xf")]()[_0xb64a("0x10")](0x0, 0xa);
    return new Employee(
      _0x12c780[0x0][_0xb64a("0x34")],
      _0x12c780[0x0][_0xb64a("0x38")],
      _0x10f586,
      _0x12c780[0x0][_0xb64a("0x39")],
      _0x12c780[0x0][_0xb64a("0x35")],
      _0x12c780[0x0][_0xb64a("0x1b")],
      _0x12c780[0x0]["mng_id"],
      _0x12c780[0x0]["emp_id"]
    );
  } catch (_0x48910f) {
    console[_0xb64a("0x30")](_0x48910f);
    return null;
  }
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x17")] = function(_0x5eb633) {
  if (
    !_0x5eb633 ||
    _0x5eb633["length"] === 0x0 ||
    /^\s*$/[_0xb64a("0x13")](_0x5eb633)
  ) {
    _0x5eb633 = _0xb64a("0x3a");
  }
  var _0x28c6a5 = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x3b"), [
    _0x5eb633
  ]);
  return _0x28c6a5[_0xb64a("0x25")](_0x5f24bf => {
    var _0x354b79 = new Date(_0x5f24bf["hire_date"]);
    var _0x5d9bd1 = _0x354b79[_0xb64a("0xf")]()["slice"](0x0, 0xa);
    return new Employee(
      _0x5f24bf["emp_name"],
      _0x5f24bf["emp_no"],
      _0x5d9bd1,
      _0x5f24bf[_0xb64a("0x39")],
      _0x5f24bf[_0xb64a("0x35")],
      _0x5f24bf["dept_id"],
      _0x5f24bf["mng_id"],
      _0x5f24bf["emp_id"]
    );
  });
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x3c")] = function(_0x9bb6a3) {
  if (!_0x9bb6a3) return null;
  var _0xabff72 = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x37"), [
    _0x9bb6a3
  ]);
  if (_0xabff72[_0xb64a("0x16")] == 0x1) {
    var _0x16fec8 = new Date(_0xabff72[0x0][_0xb64a("0x32")]);
    var _0x400eff = _0x16fec8[_0xb64a("0xf")]()[_0xb64a("0x10")](0x0, 0xa);
    return new Employee(
      _0xabff72[0x0]["emp_name"],
      _0xabff72[0x0]["emp_no"],
      _0x400eff,
      _0xabff72[0x0]["job"],
      _0xabff72[0x0]["salary"],
      _0xabff72[0x0][_0xb64a("0x1b")],
      _0xabff72[0x0]["mng_id"],
      _0xabff72[0x0][_0xb64a("0x3d")]
    );
  } else {
    return null;
  }
};
DataLayer["prototype"]["updateEmployee"] = function(_0x45d9a5) {
  if (!_0x45d9a5[_0xb64a("0x32")] || !_0x45d9a5[_0xb64a("0x32")]) {
    return null;
  }
  try {
    var _0x1c560c = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x3e"), [
      _0x45d9a5["emp_name"],
      _0x45d9a5[_0xb64a("0x38")],
      _0x45d9a5[_0xb64a("0x32")],
      _0x45d9a5[_0xb64a("0x39")],
      _0x45d9a5[_0xb64a("0x35")],
      _0x45d9a5["dept_id"],
      _0x45d9a5[_0xb64a("0x36")],
      _0x45d9a5[_0xb64a("0x3d")]
    ]);
    _0x1c560c = this["connection"][_0xb64a("0x24")](_0xb64a("0x37"), [
      _0x45d9a5[_0xb64a("0x3d")]
    ]);
    if (_0x1c560c["length"] == 0x1) {
      var _0x4adc52 = new Date(_0x1c560c[0x0][_0xb64a("0x32")]);
      var _0x43b015 = _0x4adc52["toISOString"]()[_0xb64a("0x10")](0x0, 0xa);
      return new Employee(
        _0x1c560c[0x0][_0xb64a("0x34")],
        _0x1c560c[0x0][_0xb64a("0x38")],
        _0x43b015,
        _0x1c560c[0x0]["job"],
        _0x1c560c[0x0]["salary"],
        _0x1c560c[0x0][_0xb64a("0x1b")],
        _0x1c560c[0x0][_0xb64a("0x36")],
        _0x1c560c[0x0]["emp_id"]
      );
    } else {
      return null;
    }
  } catch (_0x888330) {
    console[_0xb64a("0x30")](_0x888330);
    return null;
  }
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x21")] = function(_0x3d1818) {
  try {
    var _0x4291e7 = this[_0xb64a("0x6")][_0xb64a("0x24")](
      "DELETE\x20from\x20employee\x20WHERE\x20emp_id\x20=\x20?",
      [_0x3d1818]
    );
    return _0x4291e7[_0xb64a("0x31")];
  } catch (_0x5c5308) {
    console[_0xb64a("0x30")](_0x5c5308);
    return 0x0;
  }
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x3f")] = function(_0x4a77e3) {
  const _0x4b8409 = require("date-fns/format");
  var _0x1701b7 = _0x4a77e3[_0xb64a("0x40")][_0xb64a("0x41")]("\x20");
  if (
    !this[_0xb64a("0xd")](_0x1701b7[0x0]) ||
    !this[_0xb64a("0x11")](_0x1701b7[0x1])
  ) {
    return null;
  }
  var _0x1cd842 = _0x4a77e3[_0xb64a("0x42")][_0xb64a("0x41")]("\x20");
  if (
    !this[_0xb64a("0xd")](_0x1cd842[0x0]) ||
    !this[_0xb64a("0x11")](_0x1cd842[0x1])
  ) {
    return null;
  }
  try {
    var _0x2887a7 = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x43"), [
      _0x4a77e3[_0xb64a("0x40")],
      _0x4a77e3["end_time"],
      _0x4a77e3["emp_id"]
    ]);
    _0x2887a7 = this["connection"][_0xb64a("0x24")](_0xb64a("0x44"), [
      _0x2887a7[_0xb64a("0x2f")]
    ]);
    return new Timecard(
      _0x4b8409(_0x2887a7[0x0]["start_time"], _0xb64a("0x45")),
      _0x4b8409(_0x2887a7[0x0][_0xb64a("0x42")], _0xb64a("0x45")),
      _0x2887a7[0x0][_0xb64a("0x3d")],
      _0x2887a7[0x0][_0xb64a("0x46")]
    );
  } catch (_0x3dbfab) {
    console["log"](_0x3dbfab);
    return null;
  }
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x1e")] = function(_0x1fa90e) {
  const _0x547612 = require("date-fns/format");
  var _0x366cb6 = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x47"), [
    _0x1fa90e
  ]);
  return _0x366cb6[_0xb64a("0x25")](
    _0x426936 =>
      new Timecard(
        _0x547612(_0x426936[_0xb64a("0x40")], _0xb64a("0x45")),
        _0x547612(_0x426936["end_time"], _0xb64a("0x45")),
        _0x426936[_0xb64a("0x3d")],
        _0x426936[_0xb64a("0x46")]
      )
  );
};
DataLayer["prototype"][_0xb64a("0x48")] = function(_0x81ad2b) {
  const _0x2d510d = require(_0xb64a("0x15"));
  if (!_0x81ad2b) return null;
  var _0x2cb253 = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x44"), [
    _0x81ad2b
  ]);
  if (_0x2cb253[_0xb64a("0x16")] == 0x1) {
    return new Timecard(
      _0x2d510d(_0x2cb253[0x0]["start_time"], _0xb64a("0x45")),
      _0x2d510d(_0x2cb253[0x0][_0xb64a("0x42")], "YYYY-MM-DD\x20HH:mm:ss"),
      _0x2cb253[0x0][_0xb64a("0x3d")],
      _0x2cb253[0x0]["timecard_id"]
    );
  } else {
    return null;
  }
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x49")] = function(_0x25ef6f) {
  const _0x5a8f92 = require("date-fns/format");
  var _0x2a001b = _0x25ef6f["start_time"][_0xb64a("0x41")]("\x20");
  if (
    !this[_0xb64a("0xd")](_0x2a001b[0x0]) ||
    !this[_0xb64a("0x11")](_0x2a001b[0x1])
  ) {
    return null;
  }
  var _0x1ea337 = _0x25ef6f[_0xb64a("0x42")][_0xb64a("0x41")]("\x20");
  if (
    !this["isValidDate"](_0x1ea337[0x0]) ||
    !this[_0xb64a("0x11")](_0x1ea337[0x1])
  ) {
    return null;
  }
  try {
    var _0x43179a = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x4a"), [
      _0x25ef6f[_0xb64a("0x40")],
      _0x25ef6f[_0xb64a("0x42")],
      _0x25ef6f[_0xb64a("0x46")]
    ]);
    _0x43179a = this[_0xb64a("0x6")][_0xb64a("0x24")](_0xb64a("0x44"), [
      _0x25ef6f[_0xb64a("0x46")]
    ]);
    if (_0x43179a[_0xb64a("0x16")] == 0x1) {
      return new Timecard(
        _0x5a8f92(_0x43179a[0x0][_0xb64a("0x40")], "YYYY-MM-DD\x20HH:mm:ss"),
        _0x5a8f92(_0x43179a[0x0][_0xb64a("0x42")], _0xb64a("0x45")),
        _0x43179a[0x0][_0xb64a("0x3d")],
        _0x43179a[0x0][_0xb64a("0x46")]
      );
    } else {
      return null;
    }
  } catch (_0x1bd5ed) {
    console[_0xb64a("0x30")](_0x1bd5ed);
    return null;
  }
};
DataLayer[_0xb64a("0x9")][_0xb64a("0x1f")] = function(_0x56eb98) {
  try {
    var _0x374bf9 = this["connection"]["query"](_0xb64a("0x4b"), [_0x56eb98]);
    return _0x374bf9[_0xb64a("0x31")];
  } catch (_0x1af371) {
    console[_0xb64a("0x30")](_0x1af371);
    return 0x0;
  }
};
module[_0xb64a("0x4c")] = DataLayer;