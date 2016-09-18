#!/bin/sh
exec scala -cp "/data/sss/game-server/release/0.0.1-SNAPSHOT/lib/*.jar" "$0" "$@"
!#
object HelloWorld extends App {
  println("Hello, world!")
}
HelloWorld.main(args)
