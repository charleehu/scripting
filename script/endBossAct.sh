#!bin/bash
exec scala -cp "/data/sss/game-server/release/0.0.1-SNAPSHOT/lib/*" "$0" "$@"
!#

import com.netease.easegame.commons.server.utils.GameClient
import com.netease.easegame.commons.server.core.proto.PBProtos._
import com.netease.easegame.commons.server.core.proto._
import scala.collection.mutable.ListBuffer
import scala.collection.JavaConverters._

/**
 *
 * @author <a href="mailto:huxiaowei@corp.netease.com">Xiaowei Hu</a>
 * @version 1.0 Dec 6, 2014 5:08:22 PM
 */
object UpUserArenaRank extends App {
  def call(callfunc : GameClient => PBResponse) {
    val client = new GameClient("localhost", 8080, "d2d8886c3e60ce157d536505480ed95e")
    
    try {
        val response = callfunc(client)
        
        //print result
        println(response.getStatus().name() + ": " + response.getResponseMessage())
    } finally {
        client.close()
    }
  }

  call { _.call("endBossAct", PBStringArray.newBuilder.addValue(args(0)).addValue(args(1)).build())}
}
UpUserArenaRank.main(args)
