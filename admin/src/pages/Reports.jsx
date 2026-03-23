import { Briefcase, Building2, FileText, TrendingDown, Users, Loader } from "lucide-react";
import HiringTrendsAnalysisComponent from "../components/HiringTrendsAnalysisComponent";
import Sidemenu from "../components/Sidemenu";
import Topbar from "../components/topbar";
import JobsByIndustryComponent from "../components/JobsByIndustryComponent";
import AttritionRateTrendComponent from "../components/AttritionRateTrendComponent";
import ApplicantStatusDistributionComponent from "../components/ApplicantStatusDistributionComponents";
import TopPerformingCompaniesComponent from "../components/TopPerformingCompaniesComponents";
import { fetchAllSelectCompany } from "../services/companyServices";
import { exportReportToDocx } from "../services/reportsServices";
import { useState, useEffect } from "react";
import Select from "../components/ui/Select";
import { toast } from "react-toastify";
import Input from "../components/ui/Input";
import { getCurrentMonth } from "../utils/tools";

export default function Reports() {

    const [company, setCompany] = useState('');
    const [monthYear, setMonthYear] = useState(getCurrentMonth);

    const [selectCompanies, setSelectCompanies] = useState([]);
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        const runFetchAllCompany = async () => {
            const { success, message, companies } = await fetchAllSelectCompany();

            if (success) {
                setSelectCompanies(companies);
            } else {
                console.error(message);
            }
        };
        runFetchAllCompany();
    }, [])

    const handleExportDocx = async () => {
        setIsExporting(true);
        const result = await exportReportToDocx(company || null);

        if (result.success) {
            toast.success('Report exported successfully!');
        } else {
            toast.error(result.message);
        }

        setIsExporting(false);
    }

    return (
        <div className="flex h-screen max-w-screen">
            <Sidemenu />
            <div className="grow max-h-screen flex flex-col overflow-auto">
                <Topbar />
                <div className="p-8 overflow-autos grow">

                    {/* report header */}
                    <section className="flex items-center justify-between flex-wrap gap-4 mb-8">
                        <div>
                            <p className="text-2xl font-semibold">Reports & Analytics</p>
                            <p className="text-gray-500">Comprehensive insights and data analysis</p>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            <button
                                onClick={handleExportDocx}
                                disabled={isExporting}
                                className="grow btn btn-ghost border-gray-300 rounded-lg disabled:opacity-50"
                            >
                                {isExporting ? (
                                    <>
                                        <Loader size={16} className="animate-spin" />
                                        <p className="font-semibold text-sm">Exporting...</p>
                                    </>
                                ) : (
                                    <>
                                        <FileText size={16} />
                                        <p className="font-semibold text-sm cursor-pointer">Export Docx</p>
                                    </>
                                )}
                            </button>
                        </div>
                    </section>

                    <section className="flex items-center justify-between gap-4 border border-gray-300 p-4 rounded-xl mb-8 flex-wrap">
                        <div className="grow">
                            <p className="font-semibold">Report Filters</p>
                            <p className="text-gray-500">Select company and date range for detailed reports</p>
                        </div>
                        <div className="grow flex gap-4">
                            <Select
                                placeholder="All Companies"
                                options={selectCompanies?.map(company => ({ value: company.id, name: company.companyName }))}
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />

                            <Input
                                type="month"
                                value={monthYear}
                                onChange={(e) => setMonthYear(e.target.value)}
                            />
                        </div>
                    </section>

                    <section className="grid lg:grid-cols-4 gap-4 mb-8">
                        <div className="border border-gray-300 px-4 py-6 rounded-xl">
                            <div className="flex items-center justify-between mb-8">
                                <p className="font-semibold text-sm">Total Hires</p>
                                <Users size={16} className="text-emerald-500 shrink-0" />
                            </div>
                            <p className="font-bold text-2xl mb-2">89</p>
                        </div>
                        <div className="border border-gray-300 px-4 py-6 rounded-xl">
                            <div className="flex items-center justify-between mb-8">
                                <p className="font-semibold text-sm">Total Applications</p>
                                <Briefcase size={16} className="text-emerald-500 shrink-0" />
                            </div>
                            <p className="font-bold text-2xl">2847</p>
                        </div>
                        <div className="border border-gray-300 px-4 py-6 rounded-xl">
                            <div className="flex items-center justify-between mb-8">
                                <p className="font-semibold text-sm">Active Companies</p>
                                <Building2 size={16} className="text-emerald-500 shrink-0" />
                            </div>
                            <p className="font-bold text-2xl">47</p>
                        </div>
                        <div className="border border-gray-300 px-4 py-6 rounded-xl">
                            <div className="flex items-center justify-between mb-8">
                                <p className="font-semibold text-sm">Attrition Rate</p>
                                <TrendingDown size={16} className="text-emerald-500 shrink-0" />
                            </div>
                            <p className="font-bold text-2xl">12.5%</p>
                        </div>
                    </section>

                    <section className="grid lg:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col border border-gray-300 h-100 p-4 rounded-xl">
                            <p className="font-semibold">Hiring Trends Analysis</p>
                            <p className="text-gray-500 mb-4">Applications, interviews, and hires over time</p>
                            <div className="grow">
                                <HiringTrendsAnalysisComponent />
                            </div>
                        </div>
                        <div className="flex flex-col border border-gray-300 h-100 p-4 rounded-xl">
                            <p className="font-semibold">Attrition Rate Trend</p>
                            <p className="text-gray-500 mb-4">Employee retention and attrition over time</p>
                            <div className="grow">
                                <AttritionRateTrendComponent />
                            </div>
                        </div>
                        <div className="flex flex-col border border-gray-300 h-100 p-4 rounded-xl">
                            <p className="font-semibold">Applicant Status Distribution</p>
                            <p className="text-gray-500 mb-4">Current status breakdown of all applicants</p>
                            <div className="grow">
                                <ApplicantStatusDistributionComponent />
                            </div>
                        </div>
                        <div className="flex flex-col border border-gray-300 h-100 p-4 rounded-xl">
                            <p className="font-semibold">Jobs by Industry</p>
                            <p className="text-gray-500 mb-4">Distribution of job postings across industries</p>
                            <div className="grow">
                                <JobsByIndustryComponent />
                            </div>
                        </div>
                    </section>
                    <div className="flex flex-col border border-gray-300 h-100 p-4 rounded-xl mb-8">
                        <p className="font-semibold">Top Performing Companies</p>
                        <p className="text-gray-500 mb-4">Companies with highest hiring activity</p>
                        <div className="grow">
                            <TopPerformingCompaniesComponent />
                        </div>
                    </div>

                    <section className="grid lg:grid-cols-3 gap-4">
                        <div className="border border-gray-300 p-4 rounded-xl">
                            <p className="font-semibold">Top Performing Companies</p>
                            <p className="text-gray-500 mb-4">Companies with highest hiring activity</p>
                            <p className="font-bold text-3xl text-emerald-500 mb-2">37.9%</p>
                            <p className="text-gray-500 mb-4">383 hires from 1,010 applications</p>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-xl">
                            <p className="font-semibold">Avg. Time to Hire</p>
                            <p className="text-gray-500 mb-4">From application to offer</p>
                            <p className="font-bold text-3xl text-emerald-500 mb-2">18 days</p>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-xl">
                            <p className="font-semibold">Interview Success Rate</p>
                            <p className="text-gray-500 mb-4">Interviews to hires</p>
                            <p className="font-bold text-3xl text-emerald-500 mb-2">64.2%</p>
                            <p className="text-gray-500 mb-4">383 hires from 596 interviews</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}