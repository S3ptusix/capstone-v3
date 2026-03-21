import { Modal, ModalBackground, ModalHeader } from "./ui/ui-modal";
import { FileText, Mail, Phone, MapPin, Award, GraduationCap, Building2, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function ApplicationDetailModal({ applicant, onClose = () => { } }) {

    const [showResume, setShowResume] = useState(false);

    if (!applicant) return null;

    const downloadResume = () => {
        if (applicant?.resume) {
            const link = document.createElement('a');
            link.href = `/server/uploads/resumes/${applicant.resume}`;
            link.download = applicant.resume;
            document.body.appendChild(link);
            link.click();
            link.parentElement.removeChild(link);
        }
    };

    return (
        <ModalBackground>
            <Modal maxWidth={600}>
                <ModalHeader
                    icon={FileText}
                    title="Application Details"
                    subTitle={applicant?.fullname}
                    onClose={onClose}
                />

                <div className="grid grid-cols-1 gap-6 mt-6">

                    {/* Personal Information */}
                    <section>
                        <p className="text-lg font-semibold mb-4">Personal Information</p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Mail size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <p className="text-sm font-medium">{applicant?.user?.email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Phone</p>
                                    <p className="text-sm font-medium">{applicant?.phone || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Position Information */}
                    <section>
                        <p className="text-lg font-semibold mb-4">Position</p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Award size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Job Title</p>
                                    <p className="text-sm font-medium">{applicant?.job?.jobTitle || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Building2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Company</p>
                                    <p className="text-sm font-medium">{applicant?.job?.company?.companyName || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Optional Links */}
                    {(applicant?.linkedIn || applicant?.portfolio) && (
                        <section>
                            <p className="text-lg font-semibold mb-4">Links</p>
                            <div className="space-y-2">
                                {applicant?.linkedIn && (
                                    <a href={applicant.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-500 hover:underline text-sm">
                                        <ExternalLink size={16} />
                                        LinkedIn Profile
                                    </a>
                                )}
                                {applicant?.portfolio && (
                                    <a href={applicant.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-500 hover:underline text-sm">
                                        <ExternalLink size={16} />
                                        Portfolio
                                    </a>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Resume */}
                    {applicant?.resume && (
                        <section>
                            <p className="text-lg font-semibold mb-4">Resume</p>
                            <button
                                onClick={downloadResume}
                                className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 text-sm font-medium"
                            >
                                <FileText size={16} />
                                Download Resume
                            </button>
                        </section>
                    )}

                    {/* Application Status */}
                    <section>
                        <p className="text-lg font-semibold mb-4">Status</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Application Status</p>
                                <p className="text-sm font-medium">{applicant?.applicantStatus || 'N/A'}</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Interview Status</p>
                                <p className="text-sm font-medium">{applicant?.interviewStatus || 'N/A'}</p>
                            </div>
                        </div>
                    </section>

                    {/* Action Button */}
                    <div className="flex gap-2 pt-4">
                        <button
                            className="flex-1 btn btn-ghost rounded-lg"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </ModalBackground>
    );
}
