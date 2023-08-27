import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  type BottomSheetBackdropProps,
  type BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import isNil from "lodash/isNil";

import PencilSquare from "../icons/pencil-square";
import Trash from "../icons/trash";
import Text from "../components/ui/text";

interface Props {
  selectedMemoryId: number | null;
  setSelectedMemoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditDeleteBottomSheet = ({
  selectedMemoryId,
  setSelectedMemoryId,
}: Props) => {
  const { bottom } = useSafeAreaInsets();

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const initialSnapPoints = React.useMemo(() => ["CONTENT_HEIGHT"], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} opacity={0.8} />
    ),
    []
  );

  const renderFooter = React.useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props}>
        <View style={{ height: bottom + 16 }} />
      </BottomSheetFooter>
    ),
    []
  );

  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  React.useEffect(() => {
    if (isNil(selectedMemoryId)) return;

    handlePresentModalPress();
  }, [selectedMemoryId]);

  const handleEditButton = () => {
    bottomSheetModalRef.current?.dismiss();
    router.push("/create-memory-modal");
  };
  const handleDeleteButton = () => {
    console.log("delete button pressed");
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      onDismiss={() => setSelectedMemoryId(null)}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}
      backgroundStyle={styles.container}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetView
        style={[styles.contentContainer, { paddingBottom: bottom + 16 }]}
        onLayout={handleContentLayout}
      >
        <Pressable onPress={handleEditButton} style={styles.buttonContainer}>
          <PencilSquare fill="#9ca3af" />
          <Text type="semiBold" style={styles.buttonText}>
            edit memory
          </Text>
        </Pressable>
        <Pressable
          onPress={handleDeleteButton}
          style={[styles.buttonContainer, styles.deleteButtonContainer]}
        >
          <Trash fill="#dc2626" />
          <Text
            type="semiBold"
            style={[styles.buttonText, styles.deleteButtonText]}
          >
            delete memory
          </Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 16,
  },
  indicator: {
    backgroundColor: "#9ca3af",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: "#4b5563",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    color: "#e5e7eb",
  },
  deleteButtonContainer: {
    borderColor: "#dc2626",
  },
  deleteButtonText: {
    color: "#dc2626",
  },
});

export default EditDeleteBottomSheet;
