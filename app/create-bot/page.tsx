"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Image from "next/image";

export default function CreateBot() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        botName: "",
        description: "",
        excelFile: null as File | null,
        agentTemplate: "customer-support",
        baseModel: "llama-7b",
        retrievalPrompt:
            "Bạn là một AI assistant chuyên nghiệp. Hãy tìm kiếm thông tin chính xác từ dữ liệu được cung cấp để trả lời câu hỏi của người dùng.",
        queryBuilderPrompt:
            "Phân tích câu hỏi của người dùng và tạo query phù hợp để tìm kiếm thông tin trong database.",
        answerPrompt:
            "Dựa trên thông tin đã tìm được, hãy đưa ra câu trả lời chính xác, chi tiết và dễ hiểu cho người dùng.",
        conversationPrompt:
            "Bạn là một trợ lý AI thân thiện và chuyên nghiệp. Hãy trò chuyện một cách tự nhiên và hỗ trợ người dùng tốt nhất có thể.",
        summaryPrompt:
            "Tóm tắt nội dung cuộc hội thoại một cách súc tích và đầy đủ thông tin quan trọng.",
        embeddingModel: "bge-m3",
        embeddingSize: 1024,
        chunkSize: 512,
        overlap: 100,
        similarityThreshold: 0.7,
        topKResults: 5,
        rerankStrategy: "similarity",
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxTokens: 1024,
        stopSequences: ["[STOP]", "###", "Human:", "Assistant:"],
    });

    const [isCreating, setIsCreating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // Agent Templates với các prompt tương ứng
    const agentTemplates = [
        {
            id: "customer-support",
            name: "Hỗ trợ Khách hàng",
            description:
                "Template cho chatbot hỗ trợ khách hàng với khả năng trả lời FAQ, giải quyết vấn đề và hướng dẫn sử dụng",
            icon: "ri-customer-service-2-line",
            agents: ["Retrieval Agent", "Answer Agent", "Conversation Agent"],
            prompts: {
                retrievalPrompt:
                    "Bạn là chuyên gia hỗ trợ khách hàng. Hãy tìm kiếm thông tin chính xác từ cơ sở dữ liệu FAQ và hướng dẫn để giải đáp thắc mắc của khách hàng.",
                answerPrompt:
                    "Dựa trên thông tin đã tìm được, hãy đưa ra câu trả lời hữu ích, dễ hiểu và thân thiện. Luôn tập trung vào việc giải quyết vấn đề của khách hàng.",
                conversationPrompt:
                    "Bạn là nhân viên hỗ trợ khách hàng chuyên nghiệp. Hãy giao tiếp một cách thân thiện, kiên nhẫn và luôn sẵn sàng giúp đỡ.",
            },
        },
        {
            id: "sales-assistant",
            name: "Trợ lý Bán hàng",
            description:
                "Template cho chatbot tư vấn bán hàng với khả năng giới thiệu sản phẩm, so sánh và hỗ trợ quyết định mua hàng",
            icon: "ri-shopping-cart-line",
            agents: [
                "Retrieval Agent",
                "Query Builder Agent",
                "Answer Agent",
                "Conversation Agent",
            ],
            prompts: {
                retrievalPrompt:
                    "Bạn là chuyên gia bán hàng. Tìm kiếm thông tin về sản phẩm, giá cả, khuyến mãi và so sánh để tư vấn tốt nhất cho khách hàng.",
                queryBuilderPrompt:
                    "Phân tích nhu cầu và câu hỏi của khách hàng để tạo truy vấn tìm kiếm sản phẩm phù hợp nhất.",
                answerPrompt:
                    "Đưa ra lời tư vấn chuyên nghiệp về sản phẩm. Tập trung vào lợi ích, giá trị và phù hợp với nhu cầu khách hàng.",
                conversationPrompt:
                    "Bạn là tư vấn bán hàng chuyên nghiệp, nhiệt tình và am hiểu sản phẩm. Hãy tư vấn một cách thuyết phục nhưng không áp đặt.",
            },
        },
        {
            id: "technical-support",
            name: "Hỗ trợ Kỹ thuật",
            description:
                "Template cho chatbot hỗ trợ kỹ thuật với khả năng chẩn đoán, khắc phục sự cố và hướng dẫn kỹ thuật",
            icon: "ri-tools-line",
            agents: [
                "Retrieval Agent",
                "Query Builder Agent",
                "Answer Agent",
                "Summary Agent",
            ],
            prompts: {
                retrievalPrompt:
                    "Bạn là kỹ thuật viên chuyên nghiệp. Tìm kiếm thông tin kỹ thuật, hướng dẫn khắc phục và tài liệu hỗ trợ để giải quyết vấn đề.",
                queryBuilderPrompt:
                    "Phân tích mô tả lỗi và triệu chứng để xác định chính xác vấn đề kỹ thuật cần giải quyết.",
                answerPrompt:
                    "Đưa ra hướng dẫn khắc phục chi tiết, từng bước một cách logic và dễ thực hiện. Ưu tiên giải pháp đơn giản trước.",
                summaryPrompt:
                    "Tóm tắt vấn đề kỹ thuật và các bước khắc phục đã thực hiện để theo dõi và tham khảo sau này.",
            },
        },
        {
            id: "hr-assistant",
            name: "Trợ lý Nhân sự",
            description:
                "Template cho chatbot HR với khả năng tư vấn chính sách, quy trình và hỗ trợ nhân viên",
            icon: "ri-team-line",
            agents: [
                "Retrieval Agent",
                "Answer Agent",
                "Conversation Agent",
                "Summary Agent",
            ],
            prompts: {
                retrievalPrompt:
                    "Bạn là chuyên gia HR. Tìm kiếm thông tin về chính sách công ty, quy trình HR và các quy định để tư vấn nhân viên.",
                answerPrompt:
                    "Giải thích chính sách và quy trình HR một cách rõ ràng, chính xác. Luôn đảm bảo tuân thủ quy định và bảo mật thông tin.",
                conversationPrompt:
                    "Bạn là chuyên viên HR thân thiện và chuyên nghiệp. Hãy lắng nghe và hỗ trợ nhân viên một cách tận tình.",
                summaryPrompt:
                    "Tóm tắt các vấn đề HR đã tư vấn và các bước tiếp theo cần thực hiện.",
            },
        },
    ];

    // Base LLM Models
    const baseLLMModels = [
        {
            id: "llama-7b",
            name: "Llama 2 7B",
            description: "Mô hình mạnh mẽ, cân bằng hiệu suất và chất lượng",
            performance: "Cao",
            speed: "Trung bình",
        },
        {
            id: "llama-13b",
            name: "Llama 2 13B",
            description: "Hiệu suất cao hơn, phù hợp cho tác vụ phức tạp",
            performance: "Rất cao",
            speed: "Chậm",
        },
        {
            id: "qwen-7b",
            name: "Qwen 7B",
            description: "Tối ưu cho tiếng Việt và ngôn ngữ châu Á",
            performance: "Cao",
            speed: "Nhanh",
        },
        {
            id: "mistral-7b",
            name: "Mistral 7B",
            description: "Xử lý nhanh, phù hợp cho real-time response",
            performance: "Trung bình",
            speed: "Rất nhanh",
        },
        {
            id: "gemma-7b",
            name: "Gemma 7B",
            description: "Cân bằng tốt giữa độ chính xác và tốc độ",
            performance: "Cao",
            speed: "Nhanh",
        },
    ];

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                // 10MB limit
                alert("Kích thước file không được vượt quá 10MB");
                return;
            }
            if (!file.name.match(/\.(xlsx|xls)$/i)) {
                alert("Chỉ hỗ trợ file Excel (.xlsx, .xls)");
                return;
            }
            setFormData((prev) => ({ ...prev, excelFile: file }));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const file = files[0];
            if (file.size > 10 * 1024 * 1024) {
                alert("Kích thước file không được vượt quá 10MB");
                return;
            }
            if (!file.name.match(/\.(xlsx|xls)$/i)) {
                alert("Chỉ hỗ trợ file Excel (.xlsx, .xls)");
                return;
            }
            setFormData((prev) => ({ ...prev, excelFile: file }));
        }
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => {
            const newData = { ...prev, [field]: value };

            // Khi thay đổi agent template, cập nhật các prompt mặc định
            if (field === "agentTemplate") {
                const template = agentTemplates.find((t) => t.id === value);
                if (template) {
                    // Type-safe update of prompts
                    const prompts = template.prompts;
                    Object.entries(prompts).forEach(
                        ([promptKey, promptValue]) => {
                            if (
                                promptKey in newData &&
                                typeof promptValue === "string"
                            ) {
                                (newData as any)[promptKey] = promptValue;
                            }
                        }
                    );
                }
            }

            return newData;
        });
    };

    const handleCreateBot = async () => {
        setIsCreating(true);

        // Simulate bot creation process
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setIsCreating(false);
        setShowSuccess(true);
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Get current agent template
    const currentAgentTemplate = agentTemplates.find(
        (t) => t.id === formData.agentTemplate
    );

    if (showSuccess) {
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
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Top Header */}
                    <div className="bg-white border-b px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Tạo Chatbot
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Hoàn thành tạo chatbot mới
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="/">
                                    <Button variant="outline">
                                        <i className="ri-dashboard-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                        Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Success Content */}
                    <div className="flex-1 flex items-center justify-center p-6">
                        <Card className="max-w-md text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                                <i className="ri-check-line text-2xl text-green-600"></i>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Chatbot đã được tạo thành công!
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Chatbot "{formData.botName}" đã sẵn sàng để trả
                                lời câu hỏi từ dữ liệu Excel của bạn.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Link href="/">
                                    <Button className="w-full">
                                        <i className="ri-dashboard-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                        Đi tới Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowSuccess(false);
                                        setCurrentStep(1);
                                        setFormData({
                                            botName: "",
                                            description: "",
                                            excelFile: null,
                                            agentTemplate: "customer-support",
                                            baseModel: "llama-7b",
                                            retrievalPrompt:
                                                "Bạn là một AI assistant chuyên nghiệp. Hãy tìm kiếm thông tin chính xác từ dữ liệu được cung cấp để trả lời câu hỏi của người dùng.",
                                            queryBuilderPrompt:
                                                "Phân tích câu hỏi của người dùng và tạo query phù hợp để tìm kiếm thông tin trong database.",
                                            answerPrompt:
                                                "Dựa trên thông tin đã tìm được, hãy đưa ra câu trả lời chính xác, chi tiết và dễ hiểu cho người dùng.",
                                            conversationPrompt:
                                                "Bạn là một trợ lý AI thân thiện và chuyên nghiệp. Hãy trò chuyện một cách tự nhiên và hỗ trợ người dùng tốt nhất có thể.",
                                            summaryPrompt:
                                                "Tóm tắt nội dung cuộc hội thoại một cách súc tích và đầy đủ thông tin quan trọng.",
                                            embeddingModel: "bge-m3",
                                            embeddingSize: 1024,
                                            chunkSize: 512,
                                            overlap: 100,
                                            similarityThreshold: 0.7,
                                            topKResults: 5,
                                            rerankStrategy: "similarity",
                                            temperature: 0.7,
                                            topP: 0.9,
                                            topK: 40,
                                            maxTokens: 1024,
                                            stopSequences: [
                                                "[STOP]",
                                                "###",
                                                "Human:",
                                                "Assistant:",
                                            ],
                                        });
                                    }}
                                    className="w-full"
                                >
                                    Tạo chatbot khác
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

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

                {/* Sidebar Navigation */}
                <nav className="px-4 pb-4">
                    <Link
                        href="/"
                        className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-left transition-colors cursor-pointer text-gray-700 hover:bg-gray-50"
                    >
                        <i className="ri-dashboard-3-line text-lg"></i>
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <div className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-left bg-blue-50 text-blue-700 border-r-2 border-blue-600">
                        <i className="ri-add-line text-lg"></i>
                        <span className="font-medium">Tạo Chatbot</span>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <div className="bg-white border-b px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Tạo Chatbot Mới
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Tạo chatbot AI từ dữ liệu Excel của bạn
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="outline">
                                    <i className="ri-dashboard-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                    Dashboard
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
                    <div className="max-w-4xl mx-auto">
                        {/* Progress Steps */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                {[1, 2, 3, 4].map((step) => (
                                    <div
                                        key={step}
                                        className="flex items-center"
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                                currentStep >= step
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            {step}
                                        </div>
                                        {step < 4 && (
                                            <div
                                                className={`w-24 h-1 mx-4 ${
                                                    currentStep > step
                                                        ? "bg-blue-600"
                                                        : "bg-gray-200"
                                                }`}
                                            ></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 text-sm">
                                <span
                                    className={
                                        currentStep >= 1
                                            ? "text-blue-600 font-medium"
                                            : "text-gray-500"
                                    }
                                >
                                    Thông tin cơ bản
                                </span>
                                <span
                                    className={
                                        currentStep >= 2
                                            ? "text-blue-600 font-medium"
                                            : "text-gray-500"
                                    }
                                >
                                    LLM model
                                </span>
                                <span
                                    className={
                                        currentStep >= 3
                                            ? "text-blue-600 font-medium"
                                            : "text-gray-500"
                                    }
                                >
                                    Cấu hình nâng cao
                                </span>
                                <span
                                    className={
                                        currentStep >= 4
                                            ? "text-blue-600 font-medium"
                                            : "text-gray-500"
                                    }
                                >
                                    Upload dữ liệu
                                </span>
                            </div>
                        </div>

                        {/* Step Content */}
                        <Card>
                            {/* Step 1: Basic Info */}
                            {currentStep === 1 && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">
                                        Thông tin cơ bản
                                    </h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tên chatbot *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.botName}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "botName",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Ví dụ: Bot hỗ trợ khách hàng"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mô tả chatbot
                                            </label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Mô tả ngắn gọn về mục đích sử dụng chatbot..."
                                                rows={4}
                                                maxLength={500}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <div className="text-right text-xs text-gray-500 mt-1">
                                                {formData.description.length}
                                                /500
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Agent Template & Base Model */}
                            {currentStep === 2 && (
                                <div>
                                    {/* <h2 className="text-2xl font-bold mb-6">
                                        Chọn Template Agent & Mô hình
                                    </h2> */}

                                    {/* Agent Template Selection */}
                                    {/* <div className="mb-8">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Template Agent
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {agentTemplates.map((template) => (
                                                <div
                                                    key={template.id}
                                                    onClick={() =>
                                                        handleInputChange(
                                                            "agentTemplate",
                                                            template.id
                                                        )
                                                    }
                                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                        formData.agentTemplate ===
                                                        template.id
                                                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                                            : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                                    formData.agentTemplate ===
                                                                    template.id
                                                                        ? "bg-blue-600 text-white"
                                                                        : "bg-gray-100 text-gray-600"
                                                                }`}
                                                            >
                                                                <i
                                                                    className={`${template.icon} text-lg`}
                                                                ></i>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900">
                                                                    {
                                                                        template.name
                                                                    }
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                                formData.agentTemplate ===
                                                                template.id
                                                                    ? "border-blue-500 bg-blue-500"
                                                                    : "border-gray-300"
                                                            }`}
                                                        >
                                                            {formData.agentTemplate ===
                                                                template.id && (
                                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        {template.description}
                                                    </p>

                                                    <div>
                                                        <div className="text-xs font-medium text-gray-500 mb-2">
                                                            Các Agent được sử
                                                            dụng:
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {template.agents.map(
                                                                (
                                                                    agent,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={`px-2 py-1 rounded-full text-xs ${
                                                                            formData.agentTemplate ===
                                                                            template.id
                                                                                ? "bg-blue-100 text-blue-700"
                                                                                : "bg-gray-100 text-gray-600"
                                                                        }`}
                                                                    >
                                                                        {agent}
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div> */}

                                    {/* Base LLM Model Selection */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Mô hình LLM cơ sở
                                        </h3>
                                        <div className="space-y-3">
                                            {baseLLMModels.map((model) => (
                                                <div
                                                    key={model.id}
                                                    onClick={() =>
                                                        handleInputChange(
                                                            "baseModel",
                                                            model.id
                                                        )
                                                    }
                                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                        formData.baseModel ===
                                                        model.id
                                                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                                            : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h4 className="font-semibold text-gray-900">
                                                                    {model.name}
                                                                </h4>
                                                                <div
                                                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                                        formData.baseModel ===
                                                                        model.id
                                                                            ? "border-blue-500 bg-blue-500"
                                                                            : "border-gray-300"
                                                                    }`}
                                                                >
                                                                    {formData.baseModel ===
                                                                        model.id && (
                                                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mb-3">
                                                                {
                                                                    model.description
                                                                }
                                                            </p>
                                                            <div className="flex gap-4">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs text-gray-500">
                                                                        Hiệu
                                                                        suất:
                                                                    </span>
                                                                    <span
                                                                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                                            model.performance ===
                                                                            "Rất cao"
                                                                                ? "bg-green-100 text-green-700"
                                                                                : model.performance ===
                                                                                  "Cao"
                                                                                ? "bg-blue-100 text-blue-700"
                                                                                : "bg-yellow-100 text-yellow-700"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            model.performance
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs text-gray-500">
                                                                        Tốc độ:
                                                                    </span>
                                                                    <span
                                                                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                                            model.speed ===
                                                                            "Rất nhanh"
                                                                                ? "bg-green-100 text-green-700"
                                                                                : model.speed ===
                                                                                  "Nhanh"
                                                                                ? "bg-blue-100 text-blue-700"
                                                                                : model.speed ===
                                                                                  "Trung bình"
                                                                                ? "bg-yellow-100 text-yellow-700"
                                                                                : "bg-red-100 text-red-700"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            model.speed
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Advanced Configuration */}
                            {currentStep === 3 && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-2">
                                                Cấu hình nâng cao
                                            </h2>
                                            <p className="text-gray-600">
                                                <i className="ri-information-line mr-2"></i>
                                                Tùy chỉnh chi tiết tham số AI.
                                                Người dùng cơ bản có thể bỏ qua
                                                và sử dụng cài đặt mặc định.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Display selected template info */}

                                    <div className="space-y-8">
                                        {/* LLM Model Configuration */}
                                        <div className="border-t pt-8">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <i className="ri-cpu-line text-gray-600 text-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            Cấu hình LLM
                                                            Parameters
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            Tùy chỉnh các tham
                                                            số để điều khiển
                                                            hành vi sinh văn bản
                                                            của AI
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        // Reset LLM parameters về mặc định
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            temperature: 0.7,
                                                            topP: 0.9,
                                                            topK: 40,
                                                            maxTokens: 1024,
                                                            stopSequences: [
                                                                "[STOP]",
                                                                "###",
                                                                "Human:",
                                                                "Assistant:",
                                                            ],
                                                        }));
                                                    }}
                                                    className="flex items-center gap-1 text-xs"
                                                >
                                                    <i className="ri-restart-line text-xs"></i>
                                                    Reset LLM parameters
                                                </Button>
                                            </div>

                                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                                                <div className="flex items-start gap-3">
                                                    <i className="ri-lightbulb-line text-purple-600 text-lg mt-0.5"></i>
                                                    <div>
                                                        <h4 className="font-medium text-purple-800 mb-2">
                                                            Về LLM Parameters:
                                                        </h4>
                                                        <p className="text-sm text-purple-700 mb-3">
                                                            Các tham số này kiểm
                                                            soát cách mô hình AI
                                                            tạo ra văn bản. Việc
                                                            điều chỉnh đúng sẽ
                                                            giúp cân bằng giữa
                                                            tính sáng tạo, độ
                                                            chính xác và tính
                                                            nhất quán của câu
                                                            trả lời.
                                                        </p>
                                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <strong className="text-purple-800">
                                                                    Temperature
                                                                    & Top-P:
                                                                </strong>
                                                                <p className="text-purple-700">
                                                                    Kiểm soát
                                                                    tính ngẫu
                                                                    nhiên và đa
                                                                    dạng trong
                                                                    câu trả lời
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <strong className="text-purple-800">
                                                                    Max Tokens &
                                                                    Stop:
                                                                </strong>
                                                                <p className="text-purple-700">
                                                                    Giới hạn độ
                                                                    dài và điểm
                                                                    dừng của câu
                                                                    trả lời
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                {/* Temperature */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <i className="ri-temp-hot-line mr-2"></i>
                                                        Temperature
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="1"
                                                            step="0.1"
                                                            value={
                                                                formData.temperature
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "temperature",
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                                        />
                                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                            <span>
                                                                0.0 (Quyết đoán)
                                                            </span>
                                                            <span className="font-medium text-gray-700">
                                                                {
                                                                    formData.temperature
                                                                }
                                                            </span>
                                                            <span>
                                                                1.0 (Sáng tạo)
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Thấp = Câu trả lời nhất
                                                        quán, có thể lặp lại
                                                        <br />
                                                        Cao = Câu trả lời đa
                                                        dạng, sáng tạo hơn
                                                    </p>
                                                </div>

                                                {/* Top P */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <i className="ri-percentage-line mr-2"></i>
                                                        Top-P (Nucleus Sampling)
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="range"
                                                            min="0.1"
                                                            max="1"
                                                            step="0.1"
                                                            value={
                                                                formData.topP
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "topP",
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                                        />
                                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                            <span>
                                                                0.1 (Hẹp)
                                                            </span>
                                                            <span className="font-medium text-gray-700">
                                                                {formData.topP}
                                                            </span>
                                                            <span>
                                                                1.0 (Rộng)
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Giới hạn tập token có
                                                        thể được chọn
                                                        <br />
                                                        0.9 thường là giá trị
                                                        tối ưu
                                                    </p>
                                                </div>

                                                {/* Top K */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <i className="ri-hashtag mr-2"></i>
                                                        Top-K
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            value={
                                                                formData.topK
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "topK",
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            min={1}
                                                            max={100}
                                                            step={1}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                        <div className="absolute right-3 top-3 text-xs text-gray-400">
                                                            tokens
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 text-xs">
                                                        <div className="flex justify-between text-gray-500">
                                                            <span>
                                                                1 (Rất hẹp)
                                                            </span>
                                                            <span
                                                                className={`font-medium ${
                                                                    formData.topK <=
                                                                    20
                                                                        ? "text-blue-600"
                                                                        : formData.topK <=
                                                                          50
                                                                        ? "text-green-600"
                                                                        : "text-orange-600"
                                                                }`}
                                                            >
                                                                {formData.topK <=
                                                                20
                                                                    ? "Tập trung"
                                                                    : formData.topK <=
                                                                      50
                                                                    ? "Cân bằng"
                                                                    : "Đa dạng"}
                                                            </span>
                                                            <span>
                                                                100 (Rất rộng)
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-500 mt-1">
                                                            Số lượng token hàng
                                                            đầu được xem xét
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Max Tokens */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <i className="ri-text mr-2"></i>
                                                        Max Tokens
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            value={
                                                                formData.maxTokens
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "maxTokens",
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                                                        >
                                                            <option value={256}>
                                                                256 (Câu trả lời
                                                                ngắn)
                                                            </option>
                                                            <option value={512}>
                                                                512 (Câu trả lời
                                                                trung bình)
                                                            </option>
                                                            <option
                                                                value={1024}
                                                            >
                                                                1024 (Câu trả
                                                                lời dài)
                                                            </option>
                                                            <option
                                                                value={2048}
                                                            >
                                                                2048 (Câu trả
                                                                lời rất dài)
                                                            </option>
                                                            <option
                                                                value={4096}
                                                            >
                                                                4096 (Tối đa -
                                                                cho văn bản phức
                                                                tạp)
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Giới hạn độ dài tối đa
                                                        của câu trả lời
                                                        <br />1 token ≈ 0.75 từ
                                                        trong tiếng Việt
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Stop Sequences */}
                                            <div className="mt-6">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <i className="ri-stop-circle-line mr-2"></i>
                                                    Stop Sequences (Chuỗi dừng)
                                                </label>
                                                <div className="space-y-3">
                                                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                                                        <div className="flex flex-wrap gap-2 mb-3">
                                                            {formData.stopSequences.map(
                                                                (
                                                                    seq,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                                                    >
                                                                        <code className="bg-blue-200 px-1 rounded text-xs">
                                                                            {
                                                                                seq
                                                                            }
                                                                        </code>
                                                                        <button
                                                                            onClick={() => {
                                                                                const newSequences =
                                                                                    formData.stopSequences.filter(
                                                                                        (
                                                                                            _,
                                                                                            i
                                                                                        ) =>
                                                                                            i !==
                                                                                            index
                                                                                    );
                                                                                handleInputChange(
                                                                                    "stopSequences",
                                                                                    newSequences
                                                                                );
                                                                            }}
                                                                            className="text-blue-600 hover:text-blue-800 ml-1"
                                                                        >
                                                                            <i className="ri-close-line text-xs"></i>
                                                                        </button>
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Nhập chuỗi dừng..."
                                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                onKeyDown={(
                                                                    e
                                                                ) => {
                                                                    if (
                                                                        e.key ===
                                                                        "Enter"
                                                                    ) {
                                                                        const value =
                                                                            (
                                                                                e.target as HTMLInputElement
                                                                            ).value.trim();
                                                                        if (
                                                                            value &&
                                                                            !formData.stopSequences.includes(
                                                                                value
                                                                            )
                                                                        ) {
                                                                            handleInputChange(
                                                                                "stopSequences",
                                                                                [
                                                                                    ...formData.stopSequences,
                                                                                    value,
                                                                                ]
                                                                            );
                                                                            (
                                                                                e.target as HTMLInputElement
                                                                            ).value =
                                                                                "";
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            <button
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    const input =
                                                                        (
                                                                            e.target as HTMLElement
                                                                        )
                                                                            .previousElementSibling as HTMLInputElement;
                                                                    const value =
                                                                        input.value.trim();
                                                                    if (
                                                                        value &&
                                                                        !formData.stopSequences.includes(
                                                                            value
                                                                        )
                                                                    ) {
                                                                        handleInputChange(
                                                                            "stopSequences",
                                                                            [
                                                                                ...formData.stopSequences,
                                                                                value,
                                                                            ]
                                                                        );
                                                                        input.value =
                                                                            "";
                                                                    }
                                                                }}
                                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                                            >
                                                                Thêm
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        Các chuỗi này sẽ khiến
                                                        AI dừng sinh văn bản khi
                                                        gặp phải.
                                                        <br />
                                                        Ví dụ: "[STOP]", "###",
                                                        "Kết thúc", v.v. Nhấn
                                                        Enter hoặc click Thêm để
                                                        thêm chuỗi mới.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* LLM Performance Indicator */}
                                            <div className="mt-6 grid md:grid-cols-4 gap-4">
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                                    <i className="ri-brain-line text-2xl text-blue-600 mb-2"></i>
                                                    <h4 className="font-medium text-blue-800">
                                                        Tính sáng tạo
                                                    </h4>
                                                    <p className="text-sm text-blue-700">
                                                        {formData.temperature <=
                                                        0.3
                                                            ? "Thấp"
                                                            : formData.temperature <=
                                                              0.7
                                                            ? "Trung bình"
                                                            : "Cao"}
                                                    </p>
                                                </div>
                                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                                    <i className="ri-focus-3-line text-2xl text-green-600 mb-2"></i>
                                                    <h4 className="font-medium text-green-800">
                                                        Tính tập trung
                                                    </h4>
                                                    <p className="text-sm text-green-700">
                                                        {formData.topP <= 0.7 &&
                                                        formData.topK <= 30
                                                            ? "Cao"
                                                            : formData.topP <=
                                                                  0.9 &&
                                                              formData.topK <=
                                                                  50
                                                            ? "Trung bình"
                                                            : "Thấp"}
                                                    </p>
                                                </div>
                                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                                                    <i className="ri-article-line text-2xl text-purple-600 mb-2"></i>
                                                    <h4 className="font-medium text-purple-800">
                                                        Độ dài trả lời
                                                    </h4>
                                                    <p className="text-sm text-purple-700">
                                                        {formData.maxTokens <=
                                                        512
                                                            ? "Ngắn"
                                                            : formData.maxTokens <=
                                                              1024
                                                            ? "Trung bình"
                                                            : "Dài"}
                                                    </p>
                                                </div>
                                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                                                    <i className="ri-shield-check-line text-2xl text-orange-600 mb-2"></i>
                                                    <h4 className="font-medium text-orange-800">
                                                        Kiểm soát
                                                    </h4>
                                                    <p className="text-sm text-orange-700">
                                                        {formData.stopSequences
                                                            .length >= 3
                                                            ? "Cao"
                                                            : formData
                                                                  .stopSequences
                                                                  .length >= 1
                                                            ? "Trung bình"
                                                            : "Thấp"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Embedding Model Configuration */}
                                        <div className="border-t pt-8">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <i className="ri-brain-line text-gray-600 text-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            Cấu hình Embedding &
                                                            Vector Database
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            Thiết lập mô hình
                                                            embedding và cách xử
                                                            lý dữ liệu để tìm
                                                            kiếm thông tin
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        // Reset RAG parameters về mặc định
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            embeddingModel:
                                                                "bge-m3",
                                                            embeddingSize: 1024,
                                                            chunkSize: 512,
                                                            overlap: 100,
                                                            similarityThreshold: 0.7,
                                                            topKResults: 5,
                                                            rerankStrategy:
                                                                "similarity",
                                                        }));
                                                    }}
                                                    className="flex items-center gap-1 text-xs"
                                                >
                                                    <i className="ri-restart-line text-xs"></i>
                                                    Reset parameters
                                                </Button>
                                            </div>

                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                                <div className="flex items-start gap-3">
                                                    <i className="ri-information-line text-blue-600 text-lg mt-0.5"></i>
                                                    <div>
                                                        <h4 className="font-medium text-blue-800 mb-2">
                                                            Về Embedding &
                                                            Vector Search:
                                                        </h4>
                                                        <p className="text-sm text-blue-700 mb-3">
                                                            Embedding model
                                                            chuyển đổi văn bản
                                                            thành vector để AI
                                                            có thể tìm kiếm
                                                            thông tin liên quan.
                                                            Các tham số này ảnh
                                                            hưởng đến độ chính
                                                            xác tìm kiếm và hiệu
                                                            suất của chatbot.
                                                        </p>
                                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <strong className="text-blue-800">
                                                                    Embedding
                                                                    Model:
                                                                </strong>
                                                                <p className="text-blue-700">
                                                                    Mô hình
                                                                    chuyển đổi
                                                                    text thành
                                                                    vector
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <strong className="text-blue-800">
                                                                    Chunk
                                                                    Strategy:
                                                                </strong>
                                                                <p className="text-blue-700">
                                                                    Cách chia
                                                                    nhỏ và xử lý
                                                                    dữ liệu
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                {/* Embedding Model Selection */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <i className="ri-cpu-line mr-2"></i>
                                                        Embedding Model
                                                    </label>
                                                    <select
                                                        value={
                                                            formData.embeddingModel ||
                                                            "openai-ada-002"
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "embeddingModel",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                                                    >
                                                        <option value="openai-ada-002">
                                                            OpenAI
                                                            text-embedding-ada-002
                                                            (1536D)
                                                        </option>
                                                        <option value="openai-3-small">
                                                            OpenAI
                                                            text-embedding-3-small
                                                            (1536D)
                                                        </option>
                                                        <option value="openai-3-large">
                                                            OpenAI
                                                            text-embedding-3-large
                                                            (3072D)
                                                        </option>
                                                        <option value="sentence-transformers">
                                                            SentenceTransformers
                                                            (384D)
                                                        </option>
                                                        <option value="multilingual-e5">
                                                            Multilingual E5
                                                            (1024D)
                                                        </option>
                                                        <option value="bge-m3">
                                                            BGE-M3 (1024D) - Tốt
                                                            cho tiếng Việt
                                                        </option>
                                                    </select>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        OpenAI models yêu cầu
                                                        API key. BGE-M3 được
                                                        khuyến nghị cho tiếng
                                                        Việt.
                                                    </p>
                                                </div>

                                                {/* Similarity Threshold */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <i className="ri-focus-3-line mr-2"></i>
                                                        Similarity Threshold
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="range"
                                                            min="0.3"
                                                            max="0.9"
                                                            step="0.05"
                                                            value={
                                                                formData.similarityThreshold ||
                                                                0.7
                                                            }
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    "similarityThreshold",
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                                        />
                                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                            <span>
                                                                0.3 (Rộng)
                                                            </span>
                                                            <span className="font-medium text-gray-700">
                                                                {formData.similarityThreshold ||
                                                                    0.7}
                                                            </span>
                                                            <span>
                                                                0.9 (Strict)
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Ngưỡng để lọc kết quả
                                                        tìm kiếm. Càng cao càng
                                                        chính xác nhưng có thể
                                                        bỏ lỡ thông tin.
                                                    </p>
                                                </div>

                                                {/* Chunk Size */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <i className="ri-scissors-cut-line mr-2"></i>
                                                        Chunk Size (tokens)
                                                    </label>
                                                    <select
                                                        value={
                                                            formData.chunkSize
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "chunkSize",
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                                                    >
                                                        <option value={256}>
                                                            256 tokens (Nhỏ -
                                                            Nhanh)
                                                        </option>
                                                        <option value={512}>
                                                            512 tokens (Trung
                                                            bình - Khuyến nghị)
                                                        </option>
                                                        <option value={1000}>
                                                            1000 tokens (Lớn -
                                                            Chi tiết)
                                                        </option>
                                                        <option value={1500}>
                                                            1500 tokens (Rất lớn
                                                            - Ngữ cảnh dài)
                                                        </option>
                                                    </select>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Kích thước mỗi đoạn
                                                        text. Nhỏ = tìm kiếm
                                                        chính xác, Lớn = ngữ
                                                        cảnh đầy đủ hơn.
                                                    </p>
                                                </div>

                                                {/* Chunk Overlap */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <i className="ri-overlap-line mr-2"></i>
                                                        Chunk Overlap (tokens)
                                                    </label>
                                                    <select
                                                        value={formData.overlap}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "overlap",
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                                                    >
                                                        <option value={0}>
                                                            0 tokens (Không
                                                            overlap)
                                                        </option>
                                                        <option value={50}>
                                                            50 tokens (Ít
                                                            overlap)
                                                        </option>
                                                        <option value={100}>
                                                            100 tokens (Vừa phải
                                                            - Khuyến nghị)
                                                        </option>
                                                        <option value={200}>
                                                            200 tokens (Nhiều
                                                            overlap)
                                                        </option>
                                                    </select>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Phần chồng lấp giữa các
                                                        đoạn. Giúp đảm bảo không
                                                        mất thông tin ở ranh
                                                        giới.
                                                    </p>
                                                </div>

                                                {/* Top K Results */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <i className="ri-list-ordered mr-2"></i>
                                                        Top K Results
                                                    </label>
                                                    <select
                                                        value={
                                                            formData.topKResults ||
                                                            5
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "topKResults",
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                                                    >
                                                        <option value={3}>
                                                            3 kết quả (Nhanh)
                                                        </option>
                                                        <option value={5}>
                                                            5 kết quả (Khuyến
                                                            nghị)
                                                        </option>
                                                        <option value={10}>
                                                            10 kết quả (Đầy đủ)
                                                        </option>
                                                        <option value={15}>
                                                            15 kết quả (Toàn
                                                            diện)
                                                        </option>
                                                    </select>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Số lượng đoạn text tương
                                                        tự nhất được trả về cho
                                                        mỗi câu hỏi.
                                                    </p>
                                                </div>

                                                {/* Rerank Strategy */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <i className="ri-sort-desc mr-2"></i>
                                                        Rerank Strategy
                                                    </label>
                                                    <select
                                                        value={
                                                            formData.rerankStrategy ||
                                                            "similarity"
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "rerankStrategy",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                                                    >
                                                        <option value="similarity">
                                                            Similarity Score
                                                            (Mặc định)
                                                        </option>
                                                        <option value="recency">
                                                            Recency + Similarity
                                                            (Ưu tiên mới)
                                                        </option>
                                                        <option value="diversity">
                                                            Diversity +
                                                            Similarity (Đa dạng)
                                                        </option>
                                                        <option value="cross-encoder">
                                                            Cross-encoder Rerank
                                                            (Chính xác cao)
                                                        </option>
                                                    </select>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Cách sắp xếp lại kết quả
                                                        tìm kiếm để tối ưu độ
                                                        liên quan.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Vector Database Performance */}
                                            <div className="mt-6 grid md:grid-cols-4 gap-4">
                                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                                    <i className="ri-speed-line text-2xl text-green-600 mb-2"></i>
                                                    <h4 className="font-medium text-green-800">
                                                        Tốc độ tìm kiếm
                                                    </h4>
                                                    <p className="text-sm text-green-700">
                                                        {formData.chunkSize <=
                                                            512 &&
                                                        (formData.topKResults ||
                                                            5) <= 5
                                                            ? "Nhanh"
                                                            : formData.chunkSize <=
                                                                  1000 &&
                                                              (formData.topKResults ||
                                                                  5) <= 10
                                                            ? "Trung bình"
                                                            : "Chậm"}
                                                    </p>
                                                </div>
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                                    <i className="ri-accuracy-line text-2xl text-blue-600 mb-2"></i>
                                                    <h4 className="font-medium text-blue-800">
                                                        Độ chính xác
                                                    </h4>
                                                    <p className="text-sm text-blue-700">
                                                        {(formData.similarityThreshold ||
                                                            0.7) >= 0.8
                                                            ? "Rất cao"
                                                            : (formData.similarityThreshold ||
                                                                  0.7) >= 0.6
                                                            ? "Cao"
                                                            : "Trung bình"}
                                                    </p>
                                                </div>
                                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                                                    <i className="ri-file-list-3-line text-2xl text-purple-600 mb-2"></i>
                                                    <h4 className="font-medium text-purple-800">
                                                        Ngữ cảnh
                                                    </h4>
                                                    <p className="text-sm text-purple-700">
                                                        {formData.chunkSize >=
                                                            1000 &&
                                                        formData.overlap >= 100
                                                            ? "Phong phú"
                                                            : formData.chunkSize >=
                                                              512
                                                            ? "Đầy đủ"
                                                            : "Cơ bản"}
                                                    </p>
                                                </div>
                                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                                                    <i className="ri-database-2-line text-2xl text-orange-600 mb-2"></i>
                                                    <h4 className="font-medium text-orange-800">
                                                        Bộ nhớ vector
                                                    </h4>
                                                    <p className="text-sm text-orange-700">
                                                        {formData.chunkSize <=
                                                        512
                                                            ? "Thấp"
                                                            : formData.chunkSize <=
                                                              1000
                                                            ? "Trung bình"
                                                            : "Cao"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Upload Excel */}
                            {currentStep === 4 && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">
                                        Upload dữ liệu Excel
                                    </h2>
                                    <div className="space-y-6">
                                        <div
                                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                                                dragActive
                                                    ? "border-blue-400 bg-blue-50"
                                                    : formData.excelFile
                                                    ? "border-green-400 bg-green-50"
                                                    : "border-gray-300 hover:border-blue-400"
                                            }`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                        >
                                            <i
                                                className={`text-4xl mb-4 ${
                                                    formData.excelFile
                                                        ? "ri-file-excel-2-fill text-green-600"
                                                        : "ri-file-excel-2-line text-green-600"
                                                }`}
                                            ></i>
                                            <div className="mb-4">
                                                <p className="text-lg font-medium text-gray-700 mb-2">
                                                    {dragActive
                                                        ? "Thả file Excel tại đây"
                                                        : formData.excelFile
                                                        ? "File đã được chọn"
                                                        : "Kéo thả file Excel hoặc click để chọn"}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Hỗ trợ định dạng: .xlsx,
                                                    .xls (tối đa 10MB)
                                                </p>
                                            </div>
                                            {!formData.excelFile && (
                                                <>
                                                    <input
                                                        type="file"
                                                        accept=".xlsx,.xls"
                                                        onChange={
                                                            handleFileUpload
                                                        }
                                                        className="hidden"
                                                        id="excel-upload"
                                                    />
                                                    <label htmlFor="excel-upload">
                                                        <Button
                                                            variant="outline"
                                                            className="cursor-pointer"
                                                        >
                                                            <i className="ri-upload-2-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                                            Chọn file Excel
                                                        </Button>
                                                    </label>
                                                </>
                                            )}
                                        </div>

                                        {formData.excelFile && (
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                                                <i className="ri-file-excel-2-fill text-green-600 text-xl mr-3"></i>
                                                <div className="flex-1">
                                                    <p className="font-medium text-green-800">
                                                        {
                                                            formData.excelFile
                                                                .name
                                                        }
                                                    </p>
                                                    <p className="text-sm text-green-600">
                                                        {(
                                                            formData.excelFile
                                                                .size /
                                                            1024 /
                                                            1024
                                                        ).toFixed(2)}{" "}
                                                        MB • Đã sẵn sàng xử lý
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        handleInputChange(
                                                            "excelFile",
                                                            null
                                                        );
                                                        // Reset file input
                                                        const fileInput =
                                                            document.getElementById(
                                                                "excel-upload"
                                                            ) as HTMLInputElement;
                                                        if (fileInput)
                                                            fileInput.value =
                                                                "";
                                                    }}
                                                    className="text-red-500 hover:text-red-700 cursor-pointer p-2 hover:bg-red-100 rounded-full transition-colors"
                                                    title="Xóa file"
                                                >
                                                    <i className="ri-delete-bin-line text-lg"></i>
                                                </button>
                                            </div>
                                        )}

                                        {/* Configuration Summary */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                                                <i className="ri-settings-3-line mr-2"></i>
                                                Tóm tắt cấu hình:
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-blue-700 font-medium">
                                                        Mô hình LLM:
                                                    </span>
                                                    <p className="text-blue-600">
                                                        {
                                                            baseLLMModels.find(
                                                                (m) =>
                                                                    m.id ===
                                                                    formData.baseModel
                                                            )?.name
                                                        }
                                                    </p>
                                                </div>

                                                <div>
                                                    <span className="text-blue-700 font-medium">
                                                        Embedding Size:
                                                    </span>
                                                    <p className="text-blue-600">
                                                        {formData.embeddingSize}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-blue-700 font-medium">
                                                        Temperature:
                                                    </span>
                                                    <p className="text-blue-600">
                                                        {formData.temperature}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-blue-700 font-medium">
                                                        Max Tokens:
                                                    </span>
                                                    <p className="text-blue-600">
                                                        {formData.maxTokens}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* File Preview Info */}
                                        {formData.excelFile && (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                <h4 className="font-medium text-yellow-800 mb-3 flex items-center">
                                                    <i className="ri-information-line mr-2"></i>
                                                    Thông tin file đã chọn:
                                                </h4>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-yellow-700 font-medium">
                                                            Tên file:
                                                        </span>
                                                        <p className="text-yellow-600 truncate">
                                                            {
                                                                formData
                                                                    .excelFile
                                                                    .name
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-yellow-700 font-medium">
                                                            Kích thước:
                                                        </span>
                                                        <p className="text-yellow-600">
                                                            {(
                                                                formData
                                                                    .excelFile
                                                                    .size /
                                                                1024 /
                                                                1024
                                                            ).toFixed(2)}{" "}
                                                            MB
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-yellow-700 font-medium">
                                                            Loại file:
                                                        </span>
                                                        <p className="text-yellow-600">
                                                            {formData.excelFile
                                                                .type ||
                                                                "Excel Spreadsheet"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-yellow-700 font-medium">
                                                            Cập nhật cuối:
                                                        </span>
                                                        <p className="text-yellow-600">
                                                            {new Date(
                                                                formData.excelFile.lastModified
                                                            ).toLocaleDateString(
                                                                "vi-VN"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-2">
                                                <i className="ri-lightbulb-line mr-2"></i>
                                                Yêu cầu về định dạng dữ liệu:
                                            </h4>
                                            <ul className="text-sm text-gray-700 space-y-1">
                                                <li>
                                                    • Dữ liệu nên được tổ chức
                                                    theo dạng bảng với tiêu đề
                                                    cột rõ ràng
                                                </li>
                                                <li>
                                                    • Mỗi hàng chứa một thông
                                                    tin hoặc câu hỏi-trả lời
                                                </li>
                                                <li>
                                                    • Tránh merge cell hoặc định
                                                    dạng phức tạp
                                                </li>
                                                <li>
                                                    • Dữ liệu text nên đầy đủ và
                                                    có nghĩa
                                                </li>
                                                <li>
                                                    • Khuyến khích sử dụng cột
                                                    "Câu hỏi" và "Trả lời" để
                                                    tối ưu hiệu quả
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t">
                            <div>
                                {currentStep > 1 && (
                                    <Button
                                        variant="outline"
                                        onClick={prevStep}
                                    >
                                        <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                        Quay lại
                                    </Button>
                                )}
                            </div>

                            <div>
                                {currentStep < 4 ? (
                                    <Button
                                        onClick={nextStep}
                                        disabled={
                                            currentStep === 1 &&
                                            !formData.botName
                                        }
                                    >
                                        Tiếp theo
                                        <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center ml-2"></i>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleCreateBot}
                                        disabled={isCreating}
                                        className="min-w-[140px]"
                                    >
                                        {isCreating ? (
                                            <>
                                                <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center mr-2 animate-spin"></i>
                                                Đang tạo...
                                            </>
                                        ) : (
                                            <>
                                                <i className="ri-magic-line w-4 h-4 flex items-center justify-center mr-2"></i>
                                                Tạo Chatbot
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading Overlay */}
            {isCreating && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="max-w-md text-center">
                        <div className="w-16 h-16 mx-auto mb-6">
                            <i className="ri-loader-4-line text-4xl text-blue-600 animate-spin"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Đang xử lý dữ liệu...
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>✓ Đọc file Excel</p>
                            <p>✓ Xử lý dữ liệu</p>
                            <p className="text-blue-600">
                                🔄 Tạo vector embeddings...
                            </p>
                            <p className="text-gray-400">⏳ Khởi tạo chatbot</p>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
