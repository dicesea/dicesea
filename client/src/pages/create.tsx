import styled from "styled-components";
import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import { FormEvent, useState, useRef, useEffect } from "react";
import { capitalizeFirstLetter, categories, trimInputSpaces } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { getLocalStorage } from "@/methods/features/marketplaceSlice";
import { useAppDispatch, useAppSelector } from "@/methods/app/hooks";
import { CREATE_RECORD } from "../querys/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "@/components/toast";
import Auth from "@/components/modals/auth";

const SSection = styled.section`
  background-color: #fff;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 100px auto 50px;
`;

const Button = styled.button`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  font-style: normal;
  color: #ffffff;
  border: 0;
  width: 100%;
  height: 45px;
  cursor: pointer;
  background: #0069ff;
  border-radius: 50px;
  margin-top: 30px;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 40px;

  @media (min-width: 414px) {
    font-weight: 700;
    font-size: 30px;
  }

  // Small
  @media (min-width: 360px) {
    font-weight: 700;
    font-size: 30px;
  }

  // Medium
  @media (min-width: 1280px) {
    font-weight: 700;
    font-size: 35px;
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  color: #000;
  margin-top: 20px;
`;

const Span = styled.span`
  font-weight: 500;
  font-size: 12px;
  display: flex;
  color: #000;
  margin: 10px 0px;
`;

const Form = styled.form`
  display: grid;

  @media (min-width: 414px) {
    padding: 0px 20px;
  }

  // Small
  @media (min-width: 360px) {
    padding: 0px 20px;
  }

  // Medium
  @media (min-width: 1280px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div``;

const Input = styled.input`
  font-size: 16px;
  border: 2px solid rgb(229, 232, 235);
  background-color: transparent;
  border-radius: 10px;
  margin-top: 5px;
  width: 100%;
  height: 50px;
`;

const Textarea = styled.textarea`
  font-size: 1rem;
  border: 2px solid rgb(229, 232, 235);
  background-color: transparent;
  border-radius: 10px;
  resize: vertical;
  margin-top: 5px;
  height: auto;
  width: 100%;
`;

const ImageWrapper = styled.div`
  margin-top: 10px;
  height: 260px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  cursor: pointer;
  border: 3px dashed rgb(204, 204, 204);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 640px) {
    max-width: 350px;
  }

  img {
    border-radius: 10px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  img:hover {
    background-color: rgba(0, 0, 0, 0.6);
    background-color: transparent;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Select = styled.select`
  font-size: 1rem;

  border: 2px solid rgb(229, 232, 235);
  background-color: transparent;
  border-radius: 10px;
  resize: vertical;
  margin-top: 5px;
  height: auto;
  width: 100%;
  padding: 12px;
`;

export default function Create() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: any) => state.marketplace);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(getLocalStorage());

      if (!user) {
        toggleModal();
      }
    };

    initializeApp();
  }, []);

  const onChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onPreview = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Use the useMutation hook to create data
  const [createRecord, {}] = useMutation(CREATE_RECORD);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && description && imageUrl && category && price) {
      try {
        setLoading(true);

        const record = {
          name,
          description,
          price,
          imageUrl,
          category,
          creator: user.did,
          owner: user.did,
          user: {
            _id: user._id,
            did: user.did,
            name: user.name,
            email: user.email,
            description: user.description,
            profileImage: user.profileImage,
            bannerImage: user.bannerImage,
            role: user.role,
          },
        };

        const { data } = await createRecord({
          variables: { record: record },
        });

        // Check if the operation was successful
        if (data && data.createRecord) {
          setLoading(false);
          toast({ message: "Created sucessfully", position: "bottom" });
          router.push("/profile");
          setTimeout(() => {
            router.reload();
          }, 500);
        }
      } catch (e: any) {
        console.error(e.message);
        setLoading(false);
        toast({ message: e.message, position: "bottom" });
      }
    } else {
      toast({
        message: "Wrong inputs. Check again",
        position: "bottom",
      });
    }
  };

  return (
    <Layout>
      <Seo
        title="Create | DiceSea"
        description="DiceSea is an online marketplace for everyone."
      />
      <SSection>
        <Container>
          <Title>Create New Record</Title>
          <Form onSubmit={submit}>
            <Wrapper>
              <Label htmlFor="image">Image, Video, or Audio</Label>
              <Span>
                File types supported: JPG, PNG, GIF, SVG, MP3. Max size: 100 MB
              </Span>
              <ImageWrapper onClick={onChange}>
                <FileInput
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={onPreview}
                />
                {!imageUrl && (
                  <Image
                    src="/images/upload.svg"
                    alt="Upload"
                    height={100}
                    width={100}
                    priority
                  />
                )}
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    height={100}
                    width={100}
                    priority
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </ImageWrapper>
            </Wrapper>
            <Wrapper>
              <Label htmlFor="name">Name</Label>
              <Input
                placeholder="Record name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </Wrapper>
            <Wrapper>
              <Label htmlFor="Description">Description</Label>
              <Textarea
                placeholder="Record description"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Wrapper>
            <Wrapper>
              <Label htmlFor="Price">Price</Label>
              <Input
                placeholder="Record price"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(e.target.value)
                }
              />
            </Wrapper>
            <Wrapper>
              <Label htmlFor="category">Category</Label>
              <Select
                defaultValue=""
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {capitalizeFirstLetter(category.value)}
                  </option>
                ))}
              </Select>
            </Wrapper>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </Form>
        </Container>
      </SSection>
      {user ? null : <Auth isOpen={isModalOpen} onClose={toggleModal} />}
    </Layout>
  );
}
