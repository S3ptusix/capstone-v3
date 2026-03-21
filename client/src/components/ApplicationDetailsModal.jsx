import { Modal, ModalBackground, ModalHeader } from "./ui/ui-modal";
import { Calendar, FileText, Award, Building2 } from "lucide-react";

export default function ApplicationDetailsModal({ application, onClose = () => { } }) {

    if (!application) return null;

    return (
        <ModalBackground>
            <Modal maxWidth={500}>
                <ModalHeader
                    icon={FileText}
                    title="Application Details"
                    subTitle={application?.job?.jobTitle}
                    onClose={onClose}
                />

                <div className="grid grid-cols-1 gap-4 mt-6">

                    {/* Job Information */}
                    <section>
                        <p className="text-lg font-semibold mb-3">Job Information</p>
                        <div className="space-y-2">
                            <div className="flex items-start gap-3">
                                <Award size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Job Title</p>
                                    <p className="text-sm font-medium">{application?.job?.jobTitle || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Building2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Company</p>
                                    <p className="text-sm font-medium">{application?.job?.company?.companyName || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Status Information */}
                    <section>
                        <p className="text-lg font-semibold mb-3">Application Status</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Current Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <p className="text-sm font-medium">{application?.applicantStatus || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Applied Date</p>
                                <p className="text-sm font-medium">{new Date(application?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </section>

                    {/* Interview Status */}
                    {application?.interviewStatus && (
                        <section>
                            <p className="text-lg font-semibold mb-3">Interview Status</p>
                            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Interview Result</p>
                                <p className="text-sm font-medium text-blue-600">{application?.interviewStatus}</p>
                                {application?.interviewAt && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Scheduled: {new Date(application.interviewAt).toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Orientation Status */}
                    {application?.orientationStatus && (
                        <section>
                            <p className="text-lg font-semibold mb-3">Orientation Status</p>
                            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Orientation Attendance</p>
                                <p className="text-sm font-medium text-green-600">{application?.orientationStatus}</p>
                            </div>
                        </section>
                    )}

                    {/* Action Button */}
                    <div className="pt-4">
                        <button
                            className="w-full btn btn-ghost rounded-lg"
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
