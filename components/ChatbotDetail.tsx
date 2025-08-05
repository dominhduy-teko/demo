"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface Chatbot {
    id: string;
    name: string;
    description: string;
    model: string;
    status: "active" | "inactive" | "training";
    createdAt: string;
    totalQuestions: number;
    accuracy: number;
    dataSource: string;
    template: string;
}

interface ChatbotDetailProps {
    bot: Chatbot;
    onClose: () => void;
    onSave: (updatedBot: Chatbot) => void;
}

export default function ChatbotDetail({
    bot,
    onClose,
    onSave,
}: ChatbotDetailProps) {
    const [editedBot, setEditedBot] = useState<Chatbot>(bot);
    const [activeSection, setActiveSection] = useState("general");
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        onSave(editedBot);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedBot(bot);
        setIsEditing(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800";
            case "inactive":
                return "bg-gray-100 text-gray-800";
            case "training":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "active":
                return "Hoạt động";
            case "inactive":
                return "Tạm dừng";
            case "training":
                return "Đang huấn luyện";
            default:
                return "Không xác định";
        }
    };

    const sidebarSections = [
        {
            id: "general",
            label: "Thông tin chung",
            icon: "ri-information-line",
        },
        { id: "training", label: "Huấn luyện", icon: "ri-book-2-line" },
        { id: "responses", label: "Phản hồi", icon: "ri-chat-3-line" },
        { id: "analytics", label: "Thống kê", icon: "ri-bar-chart-line" },
        { id: "advanced", label: "Nâng cao", icon: "ri-settings-3-line" },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Cài đặt Chatbot
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <i className="ri-close-line text-xl"></i>
                            </button>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 truncate">
                            {bot.name}
                        </div>
                    </div>

                    <nav className="p-4">
                        {sidebarSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg text-left transition-colors ${
                                    activeSection === section.id
                                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                <i
                                    className={`${section.icon} text-lg mr-3`}
                                ></i>
                                <span className="font-medium">
                                    {section.label}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {
                                        sidebarSections.find(
                                            (s) => s.id === activeSection
                                        )?.label
                                    }
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Quản lý và cấu hình chatbot {bot.name}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                {isEditing ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={handleCancel}
                                        >
                                            Hủy
                                        </Button>
                                        <Button onClick={handleSave}>
                                            Lưu thay đổi
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={() => setIsEditing(true)}>
                                        <i className="ri-edit-line w-4 h-4 mr-2"></i>
                                        Chỉnh sửa
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {/* General Section */}
                        {activeSection === "general" && (
                            <div className="space-y-6">
                                {/* Status Card */}
                                <Card title="Trạng thái hiện tại">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <i className="ri-robot-line text-xl text-blue-600"></i>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    {bot.name}
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                        bot.status
                                                    )}`}
                                                >
                                                    {getStatusText(bot.status)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">
                                                Ngày tạo
                                            </div>
                                            <div className="font-medium">
                                                {bot.createdAt}
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Basic Information */}
                                <Card title="Thông tin cơ bản">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tên chatbot
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editedBot.name}
                                                    onChange={(e) =>
                                                        setEditedBot({
                                                            ...editedBot,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <div className="px-3 py-2 bg-gray-50 rounded-lg">
                                                    {bot.name}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mô tả
                                            </label>
                                            {isEditing ? (
                                                <textarea
                                                    value={
                                                        editedBot.description
                                                    }
                                                    onChange={(e) =>
                                                        setEditedBot({
                                                            ...editedBot,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <div className="px-3 py-2 bg-gray-50 rounded-lg">
                                                    {bot.description}
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Mô hình AI
                                                </label>
                                                {isEditing ? (
                                                    <select
                                                        value={editedBot.model}
                                                        onChange={(e) =>
                                                            setEditedBot({
                                                                ...editedBot,
                                                                model: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="Qwen3 7B">
                                                            Qwen3 7B
                                                        </option>
                                                        <option value="Qwen 7B">
                                                            Qwen 7B
                                                        </option>
                                                        <option value="Mistral 7B">
                                                            Mistral 7B
                                                        </option>
                                                        <option value="Gemma 7B">
                                                            Gemma 7B
                                                        </option>
                                                    </select>
                                                ) : (
                                                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                                                        {bot.model}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Template
                                                </label>
                                                {isEditing ? (
                                                    <select
                                                        value={
                                                            editedBot.template
                                                        }
                                                        onChange={(e) =>
                                                            setEditedBot({
                                                                ...editedBot,
                                                                template:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="Hỗ trợ khách hàng">
                                                            Hỗ trợ khách hàng
                                                        </option>
                                                        <option value="FAQ Sản phẩm">
                                                            FAQ Sản phẩm
                                                        </option>
                                                        <option value="Hướng dẫn kỹ thuật">
                                                            Hướng dẫn kỹ thuật
                                                        </option>
                                                        <option value="Chính sách công ty">
                                                            Chính sách công ty
                                                        </option>
                                                    </select>
                                                ) : (
                                                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                                                        {bot.template}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nguồn dữ liệu
                                            </label>
                                            <div className="px-3 py-2 bg-gray-50 rounded-lg">
                                                {bot.dataSource}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Trạng thái
                                            </label>
                                            {isEditing ? (
                                                <select
                                                    value={editedBot.status}
                                                    onChange={(e) =>
                                                        setEditedBot({
                                                            ...editedBot,
                                                            status: e.target
                                                                .value as
                                                                | "active"
                                                                | "inactive"
                                                                | "training",
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="active">
                                                        Hoạt động
                                                    </option>
                                                    <option value="inactive">
                                                        Tạm dừng
                                                    </option>
                                                    <option value="training">
                                                        Đang huấn luyện
                                                    </option>
                                                </select>
                                            ) : (
                                                <div className="px-3 py-2 bg-gray-50 rounded-lg">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                            bot.status
                                                        )}`}
                                                    >
                                                        {getStatusText(
                                                            bot.status
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>

                                {/* Statistics */}
                                <Card title="Thống kê hoạt động">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-600 mb-1">
                                                {bot.totalQuestions.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Tổng câu hỏi
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600 mb-1">
                                                {bot.accuracy}%
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Độ chính xác
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-600 mb-1">
                                                {Math.floor(
                                                    bot.totalQuestions / 30
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Câu hỏi/ngày (TB)
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* Training Section */}
                        {activeSection === "training" && (
                            <div className="space-y-6">
                                <Card title="Quản lý dữ liệu huấn luyện">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">
                                                    Dữ liệu hiện tại
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    File: {bot.dataSource}
                                                </p>
                                            </div>
                                            <Button className="px-6 py-3 text-lg">
                                                <i className="ri-upload-2-line w-5 h-5 mr-3"></i>
                                                Tải lên dữ liệu mới
                                            </Button>
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="flex items-center gap-2 text-blue-800 mb-2">
                                                <i className="ri-information-line"></i>
                                                <span className="font-medium">
                                                    Thông tin huấn luyện
                                                </span>
                                            </div>
                                            <p className="text-blue-700 text-sm">
                                                Bot đã được huấn luyện với{" "}
                                                {bot.totalQuestions.toLocaleString()}{" "}
                                                câu hỏi và đạt độ chính xác{" "}
                                                {bot.accuracy}%.
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card title="Lịch sử huấn luyện">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    Huấn luyện lần cuối
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {bot.createdAt}
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                Thành công
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* Other sections placeholder */}
                        {["responses", "analytics", "advanced"].includes(
                            activeSection
                        ) && (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center text-gray-500">
                                    <i
                                        className={`${
                                            sidebarSections.find(
                                                (s) => s.id === activeSection
                                            )?.icon
                                        } text-4xl mb-4`}
                                    ></i>
                                    <p>
                                        Tính năng{" "}
                                        {
                                            sidebarSections.find(
                                                (s) => s.id === activeSection
                                            )?.label
                                        }{" "}
                                        đang được phát triển
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
