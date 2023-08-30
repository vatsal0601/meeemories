import * as React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation } from "react-query";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import concat from "lodash/concat";
import isNil from "lodash/isNil";
import map from "lodash/map";
import size from "lodash/size";
import take from "lodash/take";
import takeRight from "lodash/takeRight";
import mime from "mime";

import { addMemory } from "../lib/api";
import { queryClient } from "../lib/query-client";

import ArrowLeft from "../icons/arrow-left";
import CreateMemoryMedia from "../components/create-memory-media";
import DateInput from "../components/date-input";
import SelectMediaBottomSheet from "../components/select-media-bottom-sheet";
import Text from "../components/ui/text";

const CreateMemory = () => {
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");
  const [media, setMedia] = React.useState<ImagePicker.ImagePickerAsset[]>([]);
  const [shouldShowBottomSheet, setShouldShowBottomSheet] =
    React.useState(false);

  const { bottom } = useSafeAreaInsets();
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationKey: "post-memory",
    mutationFn: async (data: FormData) => addMemory(getToken, data),
    onSuccess: () => {
      queryClient.invalidateQueries("memories");
      router.back();
    },
  });

  const handleMediaButton = () => {
    setShouldShowBottomSheet(true);
  };

  const handleMedia = (incomingMedia: ImagePicker.ImagePickerAsset[]) => {
    if (size(incomingMedia) > 5) {
      setMedia(take(incomingMedia, 5));
      return;
    }

    const newMedia = concat(media, incomingMedia);
    setMedia(takeRight(newMedia, 5));
  };

  const handlePostMemoryButton = async () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("publishedAt", date);

    if (size(media) > 0) {
      let i = 0;
      for (const item of media) {
        const uri = item.uri;
        const mimeType = mime.getType(uri);
        if (isNil(mimeType)) continue;
        const extension = mime.getExtension(mimeType);
        const fileName = `media_${i + 1}.${extension}`;
        const media = { uri, name: fileName, type: mimeType } as any; // TODO: fix this type
        formData.append("media", media);
        i++;
      }
    }

    mutation.mutate(formData);
  };

  return (
    <BottomSheetModalProvider>
      <SelectMediaBottomSheet
        shouldShowBottomSheet={shouldShowBottomSheet}
        setShouldShowBottomSheet={setShouldShowBottomSheet}
        handleMedia={handleMedia}
      />
      <ScrollView
        style={[styles.container, { paddingBottom: bottom + 16 }]}
        contentInset={{ bottom: bottom }}
        automaticallyAdjustContentInsets={true}
        automaticallyAdjustKeyboardInsets={true}
        automaticallyAdjustsScrollIndicatorInsets={true}
        keyboardDismissMode="interactive"
      >
        <View style={styles.titleContainer}>
          <Text type="bold" style={styles.title}>
            create memory
          </Text>
        </View>
        <View style={styles.mainContainer}>
          <Pressable onPress={() => router.back()} style={styles.backContainer}>
            <ArrowLeft width={16} height={16} stroke="#9ca3af" />
            <Text style={styles.backText}>go back</Text>
          </Pressable>
          <View style={styles.innerContainer}>
            <TextInput
              placeholder="tell us what happened..."
              placeholderTextColor="#4b5563"
              onChangeText={(newText) => setDescription(newText)}
              multiline={true}
              inputMode="text"
              returnKeyType="done"
              style={styles.input}
            />
            <DateInput date={date} setDate={setDate} />
            <Pressable
              onPress={handleMediaButton}
              style={styles.mediaButtonContainer}
            >
              <Text type="semiBold" style={styles.mediaButtonText}>
                add media
              </Text>
            </Pressable>
            {size(media) > 0 ? (
              <View style={styles.mediaContainer}>
                {map(media, (item, index) =>
                  item.type ? (
                    <CreateMemoryMedia
                      key={index}
                      source={item.uri}
                      type={item.type}
                      onPress={() => {
                        const newMedia = [...media];
                        newMedia.splice(index, 1);
                        setMedia(newMedia);
                      }}
                    />
                  ) : null
                )}
              </View>
            ) : null}
            <Pressable
              onPress={handlePostMemoryButton}
              disabled={mutation.isLoading}
              style={[
                styles.postButtonContainer,
                mutation.isLoading && {
                  opacity: 0.5,
                },
              ]}
            >
              <Text type="semiBold" style={styles.postButtonText}>
                {mutation.isLoading ? "posting memory..." : "post memory"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  title: {
    fontSize: 20,
    color: "#f9fafb",
  },
  mainContainer: {
    flex: 1,
    padding: 24,
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  backText: {
    fontSize: 16,
  },
  innerContainer: {
    flex: 1,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    color: "#e5e7eb",
    height: 300,
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
    borderColor: "#1f2937",
  },
  mediaButtonText: {
    fontSize: 16,
    color: "#e5e7eb",
  },
  postButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 16,
    backgroundColor: "#f9fafb",
  },
  postButtonText: {
    fontSize: 16,
    color: "#030712",
  },
  mediaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
});

export default CreateMemory;
