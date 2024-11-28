using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTPM.Models
{
    public class raising_facility
    {
        public int raising_facility_id { get; set; }
        public string name { get; set; }
        public string livestock_type { get; set; }
        public string owner { get; set; }
        public string location { get; set; }
        public string size { get; set; }
        public int number_of_employee { get; set; }
        public string condition { get; set; }
        public int certificate_id { get; set; }
    }
    public class facility
    {
        public int wtf_id { get; set; }
        public string name { get; set; }
        public string location { get; set; }
    }
    public class processing_facility
    {
        public int processing_facility_id { get; set; }
        public string name { get; set; }
        public string location { get; set; }
        public string owner { get; set; }
        public string type { get; set; }
        public int raising_facility_id { get; set; }
    }
    public class raising_facility_employee
    {
        public int employee_id { get; set; }
        public string name { get; set; }
        public string role { get; set; }
        public DateTime birthday { get; set; }
        public string gender { get; set; }
        public string phone_number { get; set; }
        public string email { get; set; }
        public int raising_facility_id { get; set; }
    }
    public class certificate
    {
        public int certificate_id { get; set; }
        public string name { get; set; }
    }
    public class certificating_facility
    {
        public int certificate_facility_id { get; set; }
        public string name { get; set; }
    }
    public class certificate_certificating_facility
    {
        public int id { get; set; }
        public int certificate_id { get; set; }
        public int certificating_facility_id { get; set; }
    }
    public class testing_facility
    {
        public int wttf_id { get; set; }
        public string name { get; set; }
        public string location { get; set; }
        public int waste_treatment_facility_id { get; set; }
        public int waste_treatment_product_id { get; set; }
    }
    public class sysdiagrams
    {
        public string name { get; set; }
        public int principal_id { get; set; }
        public int diagram_id { get; set; }
        public int version { get; set; }
        public byte[] definition { get; set; }
    }

}
