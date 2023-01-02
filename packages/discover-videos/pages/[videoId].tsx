import Loader from "components/loader"
import useMagicUserMetadata from "hooks/use-magic-user"
import { getVideo, VideoFull } from "lib/videos.lib"
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import Navbar from "components/navbar"
import Video from "components/video"

export const getStaticProps: GetStaticProps<{
  video: VideoFull | null
}> = async ({ params }: GetStaticPropsContext) => {
  const video = await getVideo(params?.videoId as string)

  return {
    props: {
      video,
    },
    //Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 second
    revalidate: 10, // In seconds
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const videoIds = ["cqGjhVJWtEg", "ZlNFpri-Y40", "Jl7vas15vQ"]
  const paths = videoIds.map((videoId) => ({
    params: { videoId },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export default function VideoId({
  video,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { userMetadata, isLoading } = useMagicUserMetadata({
    redirectTo: "/login",
  })

  if (!(isLoading || userMetadata)) return <Loader />

  if (!video) return null

  return (
    <>
      <Navbar />
      <Video video={video} />
    </>
  )
}
