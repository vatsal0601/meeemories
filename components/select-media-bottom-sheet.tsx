import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
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

import Camera from "../icons/camera";
import Photo from "../icons/photo";
import Text from "../components/ui/text";

interface Props {
  shouldShowBottomSheet: boolean;
  setShouldShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  handleMedia: (media: ImagePicker.ImagePickerAsset[]) => void;
}

const SelectMediaBottomSheet = ({
  shouldShowBottomSheet,
  setShouldShowBottomSheet,
  handleMedia,
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
    if (!shouldShowBottomSheet) return;

    handlePresentModalPress();
  }, [shouldShowBottomSheet]);

  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaStatus, requestmediaPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const handleCameraButton = async () => {
    if (isNil(cameraStatus)) return;

    if (!cameraStatus.granted) {
      const res = await requestCameraPermission();
      if (!res.granted) return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 1,
        selectionLimit: 5,
        videoMaxDuration: 300,
      });
      if (!result.canceled) {
        handleMedia(result.assets);
        bottomSheetModalRef.current?.dismiss();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleMediaButton = async () => {
    if (isNil(mediaStatus)) return;

    if (!mediaStatus.granted) {
      const res = await requestmediaPermission();
      if (!res.granted) return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 1,
        selectionLimit: 5,
        videoMaxDuration: 300,
      });
      if (!result.canceled) {
        handleMedia(result.assets);
        bottomSheetModalRef.current?.dismiss();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      onDismiss={() => setShouldShowBottomSheet(false)}
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
        <Pressable
          onPress={handleCameraButton}
          style={styles.mediaButtonContainer}
        >
          <Camera fill="#9ca3af" />
          <Text type="semiBold" style={styles.mediaButtonText}>
            open camera
          </Text>
        </Pressable>
        <Pressable
          onPress={handleMediaButton}
          style={styles.mediaButtonContainer}
        >
          <Photo fill="#9ca3af" />
          <Text type="semiBold" style={styles.mediaButtonText}>
            open photo library
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
  mediaButtonContainer: {
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
  mediaButtonText: {
    fontSize: 16,
    color: "#e5e7eb",
  },
});

export default SelectMediaBottomSheet;
