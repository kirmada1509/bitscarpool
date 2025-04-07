import { Modal, Text, View, TouchableOpacity } from "react-native";

interface CustomAlertProps {
    title: string;
    label: string;
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const CustomAlert = ({
    title,
    label,
    visible,
    onCancel,
    onConfirm,
}: CustomAlertProps) => (
    <Modal transparent visible={visible} animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/50">
            <View className="bg-white p-6 rounded-xl w-[80%]">
                <Text className="text-xl font-bold mb-2">{title}</Text>
                <Text className="mb-4">{label}</Text>
                <View className="flex-row justify-end gap-4">
                    <TouchableOpacity onPress={onCancel}>
                        <Text className="text-red-500 font-semibold">
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        onConfirm();
                    }}>
                        <Text className="text-blue-500 font-semibold">Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);
