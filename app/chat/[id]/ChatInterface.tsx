"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface Message {
    id: string;
    type: "user" | "bot";
    content: string;
    timestamp: Date;
    sources?: string[];
}

interface ChatInterfaceProps {
    botId: string;
}

export default function ChatInterface({ botId }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            type: "bot",
            content:
                "Xin chào! Tôi là chatbot AI được tạo từ dữ liệu Excel. Tôi có thể giúp bạn trả lời các câu hỏi dựa trên dữ liệu đã được cung cấp. Hãy hỏi tôi bất cứ điều gì!",
            timestamp: new Date(),
        },
    ]);

    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [botInfo] = useState({
        id: botId,
        name: "Chatbot trả lời câu hỏi về sản phẩm",
        model: "Qwen3 7B",
        status: "active",
        dataSource: "product_catalog.xlsx",
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Suggested questions based on bot type
    const suggestedQuestions = [
        "Sản phẩm của công ty có những tính năng gì nổi bật?",
        "Quy trình bảo hành như thế nào?",
        "Có những gói dịch vụ nào được cung cấp?",
        "Làm thế nào để liên hệ hỗ trợ kỹ thuật?",
        "Chính sách đổi trả sản phẩm ra sao?",
        "Có hỗ trợ cài đặt và sử dụng không?",
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const simulateBotResponse = async (
        userMessage: string
    ): Promise<Message> => {
        // Simulate API call delay
        await new Promise((resolve) =>
            setTimeout(resolve, 1500 + Math.random() * 1000)
        );

        // Mock responses based on keywords
        let response = "";
        let sources: string[] = [];

        if (
            userMessage.toLowerCase().includes("sản phẩm") ||
            userMessage.toLowerCase().includes("tính năng")
        ) {
            response =
                "Dựa trên dữ liệu Excel, sản phẩm của chúng tôi có những tính năng nổi bật sau:\\n\\n• **Giao diện thân thiện**: Dễ sử dụng cho mọi đối tượng\\n• **Bảo mật cao**: Mã hóa dữ liệu 256-bit\\n• **Tích hợp API**: Kết nối với hơn 100+ ứng dụng\\n• **Hỗ trợ đa nền tảng**: Web, Mobile, Desktop\\n• **Báo cáo thời gian thực**: Dashboard trực quan\\n\\nBạn có muốn tìm hiểu chi tiết về tính năng nào cụ thể không?";
            sources = ["Bảng_Tính_Năng_Sản_Phẩm", "Thông_Số_Kỹ_Thuật"];
        } else if (
            userMessage.toLowerCase().includes("bảo hành") ||
            userMessage.toLowerCase().includes("warranty")
        ) {
            response =
                "Theo chính sách bảo hành trong dữ liệu của chúng tôi:\\n\\n**Thời gian bảo hành:**\\n• Phần cứng: 24 tháng\\n• Phần mềm: 12 tháng kể từ ngày kích hoạt\\n• Hỗ trợ kỹ thuật: Trọn đời sản phẩm\\n\\n**Quy trình bảo hành:**\\n1. Liên hệ hotline: 1900-xxxx\\n2. Cung cấp mã sản phẩm và mô tả lỗi\\n3. Nhận hướng dẫn khắc phục hoặc lịch hẹn\\n4. Xử lý trong vòng 24-48h\\n\\nBảo hành không áp dụng cho các trường hợp do lỗi người dùng hoặc thiên tai.";
            sources = ["Chính_Sách_Bảo_Hành", "Quy_Trình_Hỗ_Trợ"];
        } else if (
            userMessage.toLowerCase().includes("gói dịch vụ") ||
            userMessage.toLowerCase().includes("pricing")
        ) {
            response =
                "Chúng tôi có 3 gói dịch vụ chính:\\n\\n**🌟 Gói Cơ bản - 299k/tháng**\\n• Tối đa 100 người dùng\\n• 5GB lưu trữ\\n• Hỗ trợ email\\n\\n**🚀 Gói Chuyên nghiệp - 799k/tháng**\\n• Tối đa 500 người dùng\\n• 50GB lưu trữ\\n• Hỗ trợ 24/7\\n• Tích hợp API\\n\\n**💎 Gói Doanh nghiệp - 1,999k/tháng**\\n• Không giới hạn người dùng\\n• 500GB lưu trữ\\n• Dedicated support\\n• Custom features\\n\\nTất cả gói đều có 14 ngày dùng thử miễn phí!";
            sources = ["Bảng_Giá_Dịch_Vụ", "So_Sánh_Gói_Cước"];
        } else if (
            userMessage.toLowerCase().includes("liên hệ") ||
            userMessage.toLowerCase().includes("hỗ trợ")
        ) {
            response =
                "Bạn có thể liên hệ với chúng tôi qua các kênh sau:\\n\\n📞 **Hotline**: 1900-1234 (24/7)\\n📧 **Email**: support@company.com\\n💬 **Live Chat**: Trên website (8h-22h)\\n🏢 **Văn phòng**: 123 Đường ABC, Quận 1, TP.HCM\\n\\n**Thời gian hỗ trợ:**\\n• Khẩn cấp: 24/7\\n• Tư vấn kỹ thuật: T2-T6 (8h-18h)\\n• Tư vấn bán hàng: T2-T7 (8h-20h)\\n\\nĐội ngũ kỹ thuật sẽ phản hồi trong vòng 30 phút đối với các yêu cầu khẩn cấp.";
            sources = ["Thông_Tin_Liên_Hệ", "Kênh_Hỗ_Trợ"];
        } else if (
            userMessage.toLowerCase().includes("đổi trả") ||
            userMessage.toLowerCase().includes("return")
        ) {
            response =
                "Chính sách đổi trả của chúng tôi:\\n\\n**⏰ Thời gian đổi trả:**\\n• Sản phẩm lỗi: 30 ngày\\n• Không hài lòng: 15 ngày\\n• Sản phẩm nguyên seal: 7 ngày\\n\\n**📋 Điều kiện:**\\n• Còn nguyên bao bì, tem mác\\n• Có hóa đơn mua hàng\\n• Không có dấu hiệu sử dụng\\n• Phụ kiện đầy đủ\\n\\n**🔄 Quy trình:**\\n1. Liên hệ bộ phận CSKH\\n2. Gửi sản phẩm về kho (miễn phí ship)\\n3. Kiểm tra và xác nhận\\n4. Hoàn tiền trong 3-5 ngày làm việc\\n\\nTrường hợp đổi sản phẩm mới, chúng tôi sẽ gửi ngay sau khi nhận được hàng cũ.";
            sources = ["Chính_Sách_Đổi_Trả", "Quy_Trình_Hoàn_Tiền"];
        } else {
            response =
                "Tôi hiểu câu hỏi của bạn và đang tìm kiếm thông tin từ dữ liệu Excel. Tuy nhiên, có vẻ như tôi cần thêm thông tin chi tiết để đưa ra câu trả lời chính xác nhất.\\n\\nBạn có thể:\\n• Diễn đạt câu hỏi cụ thể hơn\\n• Sử dụng từ khóa liên quan đến sản phẩm/dịch vụ\\n• Thử một trong những câu hỏi gợi ý bên dưới\\n\\nTôi luôn sẵn sàng hỗ trợ bạn!";
            sources = [];
        }

        return {
            id: Date.now().toString(),
            type: "bot",
            content: response,
            timestamp: new Date(),
            sources: sources.length > 0 ? sources : undefined,
        };
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: "user",
            content: inputMessage.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsTyping(true);

        try {
            const botResponse = await simulateBotResponse(userMessage.content);
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: "bot",
                content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSuggestedQuestion = (question: string) => {
        setInputMessage(question);
        inputRef.current?.focus();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTimestamp = (date: Date) => {
        return date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Bot Info Header */}
            <div className="bg-white border-b px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="ri-robot-line text-xl text-blue-600"></i>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                {botInfo.name}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>Mô hình: {botInfo.model}</span>
                                <span>•</span>
                                <span>Dữ liệu: {botInfo.dataSource}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Hoạt động</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-2"></i>
                            Xuất lịch sử
                        </Button>
                        <Button variant="outline" size="sm">
                            <i className="ri-restart-line w-4 h-4 flex items-center justify-center mr-2"></i>
                            Làm mới
                        </Button>
                    </div>
                </div>
            </div>

            {/* Chat Container */}
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${
                                message.type === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-2xl ${
                                    message.type === "user"
                                        ? "order-2"
                                        : "order-1"
                                }`}
                            >
                                <div
                                    className={`rounded-2xl px-4 py-3 ${
                                        message.type === "user"
                                            ? "bg-blue-600 text-white"
                                            : "bg-white border shadow-sm"
                                    }`}
                                >
                                    <div className="whitespace-pre-line text-sm leading-relaxed">
                                        {message.content
                                            .split("\\n")
                                            .map((line, index) => (
                                                <div key={index}>
                                                    {line.startsWith("•") ? (
                                                        <div className="ml-2">
                                                            {line}
                                                        </div>
                                                    ) : line.startsWith("**") &&
                                                      line.endsWith("**") ? (
                                                        <div className="font-semibold mt-2 mb-1">
                                                            {line.replace(
                                                                /\*\*/g,
                                                                ""
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div>{line}</div>
                                                    )}
                                                </div>
                                            ))}
                                    </div>

                                    {message.sources &&
                                        message.sources.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-gray-100">
                                                <div className="text-xs text-gray-500 mb-2">
                                                    <i className="ri-file-text-line mr-1"></i>
                                                    Nguồn tham khảo:
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {message.sources.map(
                                                        (source, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                                            >
                                                                {source.replace(
                                                                    /_/g,
                                                                    " "
                                                                )}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                                <div
                                    className={`text-xs text-gray-500 mt-1 ${
                                        message.type === "user"
                                            ? "text-right"
                                            : "text-left"
                                    }`}
                                >
                                    {formatTimestamp(message.timestamp)}
                                </div>
                            </div>

                            {message.type === "bot" && (
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 order-1">
                                    <i className="ri-robot-line text-sm text-blue-600"></i>
                                </div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                <i className="ri-robot-line text-sm text-blue-600"></i>
                            </div>
                            <div className="bg-white border rounded-2xl px-4 py-3 shadow-sm">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.1s" }}
                                    ></div>
                                    <div
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.2s" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length === 1 && (
                    <div className="px-6 py-4 bg-gray-50">
                        <div className="text-sm text-gray-600 mb-3">
                            💡 Bạn có thể thử hỏi:
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {suggestedQuestions
                                .slice(0, 3)
                                .map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            handleSuggestedQuestion(question)
                                        }
                                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                                    >
                                        {question}
                                    </button>
                                ))}
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="px-6 py-4 bg-white border-t">
                    <div className="flex items-end gap-3">
                        <div className="flex-1">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) =>
                                    setInputMessage(e.target.value)
                                }
                                onKeyPress={handleKeyPress}
                                placeholder="Nhập câu hỏi của bạn..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                                disabled={isTyping}
                            />
                        </div>
                        <Button
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim() || isTyping}
                            className="px-6 py-3"
                        >
                            {isTyping ? (
                                <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin"></i>
                            ) : (
                                <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center"></i>
                            )}
                        </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                        Chatbot AI được tạo từ dữ liệu Excel • Nhấn Enter để gửi
                    </div>
                </div>
            </div>
        </div>
    );
}
