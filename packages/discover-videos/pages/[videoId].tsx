import { getStaticVideoIds, getVideo, VideoFull } from "lib/videos.lib"
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import Navbar from "components/navbar"
import Video from "components/video"

export const getStaticProps: GetStaticProps<{
  video?: VideoFull
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
  const videoIds = await getStaticVideoIds()

  const paths = videoIds
    ? videoIds.map((videoId) => ({
        params: { videoId },
      }))
    : []

  return {
    paths,
    fallback: "blocking",
  }
}

export default function VideoId({
  video,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!video) return null
  return (
    <>
      <Navbar />
      <Video video={video} />
    </>
  )
}
