"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ChatbotDetail from "@/components/ChatbotDetail";

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

interface DataFile {
    id: string;
    name: string;
    type: string;
    size: number;
    uploadedAt: string;
    status: "processing" | "ready" | "error";
    usedByBots: string[];
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
    const [selectedBot, setSelectedBot] = useState<Chatbot | null>(null);

    const [chatbots] = useState<Chatbot[]>([
        {
            id: "1",
            name: "Chatbot trả lời câu hỏi về sản phẩm",
            description:
                "Chatbot trả lời câu hỏi về sản phẩm và dịch vụ của công ty",
            model: "Qwen3 7B",
            status: "active",
            createdAt: "2024-01-15",
            totalQuestions: 1247,
            accuracy: 94,
            dataSource: "product_catalog.xlsx",
            template: "Hỗ trợ khách hàng",
        },
        {
            id: "2",
            name: "Bot FAQ Sản phẩm",
            description: "Trả lời các câu hỏi thường gặp về tính năng sản phẩm",
            model: "Qwen 7B",
            status: "active",
            createdAt: "2024-01-10",
            totalQuestions: 892,
            accuracy: 89,
            dataSource: "product_faq.xlsx",
            template: "FAQ Sản phẩm",
        },
        {
            id: "3",
            name: "Bot Hướng dẫn Kỹ thuật",
            description: "Hỗ trợ kỹ thuật và troubleshooting cho người dùng",
            model: "Mistral 7B",
            status: "training",
            createdAt: "2024-01-20",
            totalQuestions: 156,
            accuracy: 87,
            dataSource: "technical_guide.xlsx",
            template: "Hướng dẫn kỹ thuật",
        },
        {
            id: "4",
            name: "Bot Chính sách Công ty",
            description: "Giải đáp về quy định, chính sách và quy trình nội bộ",
            model: "Gemma 7B",
            status: "inactive",
            createdAt: "2024-01-05",
            totalQuestions: 423,
            accuracy: 91,
            dataSource: "company_policies.xlsx",
            template: "Chính sách công ty",
        },
    ]);

    const [dataFiles] = useState<DataFile[]>([
        {
            id: "1",
            name: "customer_support.xlsx",
            type: "Excel",
            size: 2.4,
            uploadedAt: "2024-01-15",
            status: "ready",
            usedByBots: ["Bot Hỗ trợ Khách hàng"],
        },
        {
            id: "2",
            name: "product_faq.xlsx",
            type: "Excel",
            size: 1.8,
            uploadedAt: "2024-01-10",
            status: "ready",
            usedByBots: ["Bot FAQ Sản phẩm"],
        },
        {
            id: "3",
            name: "technical_guide.xlsx",
            type: "Excel",
            size: 3.2,
            uploadedAt: "2024-01-20",
            status: "processing",
            usedByBots: ["Bot Hướng dẫn Kỹ thuật"],
        },
        {
            id: "4",
            name: "company_policies.xlsx",
            type: "Excel",
            size: 1.5,
            uploadedAt: "2024-01-05",
            status: "ready",
            usedByBots: ["Bot Chính sách Công ty"],
        },
        {
            id: "5",
            name: "training_materials.xlsx",
            type: "Excel",
            size: 4.1,
            uploadedAt: "2024-01-22",
            status: "error",
            usedByBots: [],
        },
    ]);

    const filteredChatbots = chatbots.filter((bot) => {
        const matchesSearch =
            bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bot.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === "all" || bot.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800";
            case "inactive":
                return "bg-gray-100 text-gray-800";
            case "training":
                return "bg-blue-100 text-blue-800";
            case "ready":
                return "bg-green-100 text-green-800";
            case "processing":
                return "bg-yellow-100 text-yellow-800";
            case "error":
                return "bg-red-100 text-red-800";
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
            case "ready":
                return "Sẵn sàng";
            case "processing":
                return "Đang xử lý";
            case "error":
                return "Lỗi";
            default:
                return "Không xác định";
        }
    };

    const handleDeleteBot = (botId: string) => {
        setShowDeleteModal(null);
    };

    const handleOpenBotDetail = (bot: Chatbot) => {
        setSelectedBot(bot);
    };

    const handleCloseBotDetail = () => {
        setSelectedBot(null);
    };

    const handleSaveBot = (updatedBot: Chatbot) => {
        // Logic để cập nhật chatbot trong danh sách
        console.log("Updating bot:", updatedBot);
        setSelectedBot(null);
    };

    const sidebarItems = [
        {
            id: "overview",
            icon: "ri-dashboard-3-line",
            label: "Tổng quan",
            count: null,
        },
        {
            id: "chatbots",
            icon: "ri-robot-line",
            label: "Chatbot",
            count: chatbots.length,
        },
        // {
        //     id: "data",
        //     icon: "ri-database-2-line",
        //     label: "Dữ liệu",
        //     count: dataFiles.length,
        // },
        // {
        //     id: "analytics",
        //     icon: "ri-bar-chart-line",
        //     label: "Thống kê",
        //     count: null,
        // },
        // {
        //     id: "settings",
        //     icon: "ri-settings-3-line",
        //     label: "Cài đặt",
        //     count: null,
        // },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
                <div className="p-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/image.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </Link>
                </div>

                <nav className="px-4 pb-4">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 mb-2 rounded-lg text-left transition-colors cursor-pointer ${
                                activeTab === item.id
                                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                                    : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <i className={`${item.icon} text-lg`}></i>
                                <span className="font-medium">
                                    {item.label}
                                </span>
                            </div>
                            {item.count !== null && (
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${
                                        activeTab === item.id
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {item.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <div className="bg-white border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {sidebarItems.find(
                                    (item) => item.id === activeTab
                                )?.label || "Dashboard"}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Quản lý và theo dõi hệ thống chatbot AI của bạn
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
                                />
                            </div>
                            <Link href="/create-bot">
                                <Button>
                                    <i className="ri-add-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                    Tạo Chatbot
                                </Button>
                            </Link>
                            <Button variant="outline">
                                <i className="ri-notification-3-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                Thông báo
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Card className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className="ri-robot-line text-xl text-blue-600"></i>
                                    </div>
                                    <div className="text-3xl font-bold text-blue-600 mb-1">
                                        {chatbots.length}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Tổng Chatbot
                                    </div>
                                </Card>
                                <Card className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className="ri-play-circle-line text-xl text-green-600"></i>
                                    </div>
                                    <div className="text-3xl font-bold text-green-600 mb-1">
                                        {
                                            chatbots.filter(
                                                (bot) => bot.status === "active"
                                            ).length
                                        }
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Đang Hoạt động
                                    </div>
                                </Card>
                                <Card className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className="ri-question-answer-line text-xl text-purple-600"></i>
                                    </div>
                                    <div className="text-3xl font-bold text-purple-600 mb-1">
                                        {chatbots
                                            .reduce(
                                                (sum, bot) =>
                                                    sum + bot.totalQuestions,
                                                0
                                            )
                                            .toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Tổng Câu hỏi
                                    </div>
                                </Card>
                                <Card className="text-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className="ri-database-2-line text-xl text-orange-600"></i>
                                    </div>
                                    <div className="text-3xl font-bold text-orange-600 mb-1">
                                        {
                                            dataFiles.filter(
                                                (file) =>
                                                    file.status === "ready"
                                            ).length
                                        }
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        File Dữ liệu
                                    </div>
                                </Card>
                            </div>

                            {/* Recent Activity */}
                            <div className="grid lg:grid-cols-2 gap-6">
                                <Card
                                    title="Chatbot gần đây"
                                    description="Hoạt động của các chatbot"
                                >
                                    <div className="space-y-4">
                                        {chatbots.slice(0, 3).map((bot) => (
                                            <div
                                                key={bot.id}
                                                className="flex items-center justify-between py-2"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <i className="ri-robot-line text-sm text-blue-600"></i>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {bot.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {bot.totalQuestions}{" "}
                                                            câu hỏi
                                                        </div>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                        bot.status
                                                    )}`}
                                                >
                                                    {getStatusText(bot.status)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                <Card
                                    title="Dữ liệu mới nhất"
                                    description="File dữ liệu được tải lên gần đây"
                                >
                                    <div className="space-y-4">
                                        {dataFiles.slice(0, 3).map((file) => (
                                            <div
                                                key={file.id}
                                                className="flex items-center justify-between py-2"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <i className="ri-file-excel-2-line text-sm text-green-600"></i>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {file.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {file.size}MB •{" "}
                                                            {file.uploadedAt}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                        file.status
                                                    )}`}
                                                >
                                                    {getStatusText(file.status)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Chatbots Tab */}
                    {activeTab === "chatbots" && (
                        <div className="space-y-6">
                            {/* Filters */}
                            <Card>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <div className="flex gap-2">
                                        {[
                                            { value: "all", label: "Tất cả" },
                                            {
                                                value: "active",
                                                label: "Hoạt động",
                                            },
                                            {
                                                value: "inactive",
                                                label: "Tạm dừng",
                                            },
                                            {
                                                value: "training",
                                                label: "Đang huấn luyện",
                                            },
                                        ].map((filter) => (
                                            <button
                                                key={filter.value}
                                                onClick={() =>
                                                    setFilterStatus(
                                                        filter.value
                                                    )
                                                }
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                                                    filterStatus ===
                                                    filter.value
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                }`}
                                            >
                                                {filter.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            {/* Chatbots List */}
                            <div className="grid gap-6">
                                {filteredChatbots.map((bot) => (
                                    <Card key={bot.id}>
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                            {bot.name}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">
                                                            {bot.description}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                            bot.status
                                                        )}`}
                                                    >
                                                        {getStatusText(
                                                            bot.status
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                                                    <div>
                                                        <div className="text-gray-500">
                                                            Mô hình
                                                        </div>
                                                        <div className="font-medium text-gray-900">
                                                            {bot.model}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-500">
                                                            Ngày tạo
                                                        </div>
                                                        <div className="font-medium text-gray-900">
                                                            {bot.createdAt}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-500">
                                                            Template
                                                        </div>
                                                        <div className="font-medium text-gray-900">
                                                            {bot.template}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {/* <div className="text-gray-500">
                                                            Độ chính xác
                                                        </div>
                                                        <div className="font-medium text-gray-900">
                                                            {bot.accuracy}%
                                                        </div> */}
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-500">
                                                            Dữ liệu
                                                        </div>
                                                        <div className="font-medium text-gray-900 truncate">
                                                            {bot.dataSource}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 mt-4 lg:mt-0 lg:ml-6">
                                                <Link href={`/chat/${bot.id}`}>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <i className="ri-chat-3-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                                        Test
                                                    </Button>
                                                </Link>
                                                {/* <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <i className="ri-bar-chart-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                                    Thống kê
                                                </Button> */}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleOpenBotDetail(bot)
                                                    }
                                                >
                                                    <i className="ri-settings-3-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                                    Cài đặt
                                                </Button>
                                                <button
                                                    onClick={() =>
                                                        setShowDeleteModal(
                                                            bot.id
                                                        )
                                                    }
                                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded cursor-pointer"
                                                >
                                                    <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Data Tab */}
                    {activeTab === "data" && (
                        <div className="space-y-6">
                            <Card>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Quản lý Dữ liệu
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Upload và quản lý file Excel cho
                                            chatbot
                                        </p>
                                    </div>
                                    <Button>
                                        <i className="ri-upload-2-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                        Tải lên File
                                    </Button>
                                </div>
                            </Card>

                            <div className="grid gap-6">
                                {dataFiles.map((file) => (
                                    <Card key={file.id}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                                        file.status === "ready"
                                                            ? "bg-green-100"
                                                            : file.status ===
                                                              "processing"
                                                            ? "bg-yellow-100"
                                                            : "bg-red-100"
                                                    }`}
                                                >
                                                    <i
                                                        className={`ri-file-excel-2-line text-xl ${
                                                            file.status ===
                                                            "ready"
                                                                ? "text-green-600"
                                                                : file.status ===
                                                                  "processing"
                                                                ? "text-yellow-600"
                                                                : "text-red-600"
                                                        }`}
                                                    ></i>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        {file.name}
                                                    </h4>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <span>
                                                            {file.size}MB
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            Tải lên:{" "}
                                                            {file.uploadedAt}
                                                        </span>
                                                        <span>•</span>
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                                file.status
                                                            )}`}
                                                        >
                                                            {getStatusText(
                                                                file.status
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {file.usedByBots.length > 0 && (
                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-medium">
                                                            Sử dụng bởi:
                                                        </span>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {file.usedByBots.map(
                                                                (
                                                                    botName,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                                                    >
                                                                        {
                                                                            botName
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                                        Tải xuống
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <i className="ri-eye-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                                        Xem
                                                    </Button>
                                                    <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded cursor-pointer">
                                                        <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Other tabs content */}
                    {activeTab === "analytics" && (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center text-gray-500">
                                <i className="ri-bar-chart-line text-4xl mb-4"></i>
                                <p>Tính năng thống kê đang được phát triển</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center text-gray-500">
                                <i className="ri-settings-3-line text-4xl mb-4"></i>
                                <p>Tính năng cài đặt đang được phát triển</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <Card className="max-w-md w-full">
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <i className="ri-delete-bin-line text-xl text-red-600"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Xóa Chatbot
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Bạn có chắc chắn muốn xóa chatbot này? Hành động
                                này không thể hoàn tác.
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeleteModal(null)}
                                    className="flex-1"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleDeleteBot(showDeleteModal)
                                    }
                                    className="flex-1 bg-red-600 hover:bg-red-700"
                                >
                                    Xóa
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Chatbot Detail Modal */}
            {selectedBot && (
                <ChatbotDetail
                    bot={selectedBot}
                    onClose={handleCloseBotDetail}
                    onSave={handleSaveBot}
                />
            )}
        </div>
    );
}
