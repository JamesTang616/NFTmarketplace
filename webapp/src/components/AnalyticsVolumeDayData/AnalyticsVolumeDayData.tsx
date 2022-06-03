import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import {
  Button,
  HeaderMenu,
  Header,
  Stats,
  Icon,
  Loader,
  Mana
} from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { AnalyticsTimeframe } from '../../modules/analytics/types'
import { Props } from './AnalyticsVolumeDayData.types'
import { formatAnalyticsVolume, formatDailySales } from './utils'
import './AnalyticsVolumeDayData.css'

const AnalyticsVolumeDayData = (props: Props) => {
  const { isLoading, data, onFetchVolumeData } = props

  const [currentTimeframe, setCurrentTimeframe] = useState(
    AnalyticsTimeframe.WEEK
  )

  useEffect(() => {
    onFetchVolumeData(currentTimeframe)
  }, [onFetchVolumeData, currentTimeframe])

  return (
    <div className="AnalyticsVolumeDayData">
      <HeaderMenu>
        <HeaderMenu.Left>
          <div>
            <Header>{t('home_page.analytics.volume.title')}</Header>
            <Header sub>{t('home_page.analytics.volume.subtitle')}</Header>
          </div>
        </HeaderMenu.Left>
        <HeaderMenu.Right>
          <Button
            className={
              currentTimeframe === AnalyticsTimeframe.WEEK ? 'active' : ''
            }
            basic
            onClick={() => setCurrentTimeframe(AnalyticsTimeframe.WEEK)}
          >
            {t('home_page.analytics.volume.seven_days')}
          </Button>
          <Button
            className={
              currentTimeframe === AnalyticsTimeframe.MONTH ? 'active' : ''
            }
            basic
            onClick={() => setCurrentTimeframe(AnalyticsTimeframe.MONTH)}
          >
            {t('home_page.analytics.volume.thirty_days')}
          </Button>
          <Button
            className={
              currentTimeframe === AnalyticsTimeframe.ALL ? 'active' : ''
            }
            basic
            onClick={() => setCurrentTimeframe(AnalyticsTimeframe.ALL)}
          >
            {t('home_page.analytics.volume.all')}
          </Button>
        </HeaderMenu.Right>
      </HeaderMenu>
      <div className="stats-card">
        {!isLoading && data ? (
          <>
            <div className="stats-container">
              <Icon className="stat-icon" name="tag" />
              <Stats title={t('home_page.analytics.volume.total_sales')}>
                <div className="stats">
                  <CountUp
                    end={data.sales}
                    formattingFn={formatAnalyticsVolume}
                  />
                  <span className="stats-usd">
                    <CountUp
                      end={data.sales}
                      formattingFn={number =>
                        formatDailySales(number, currentTimeframe)
                      }
                    />
                  </span>
                </div>
              </Stats>
            </div>
            <div className="stats-container">
              <Icon className="stat-icon" name="chart line" />
              <Stats title={t('home_page.analytics.volume.total_volume')}>
                <div className="stats">
                  <Mana>
                    <CountUp
                      end={data.volume}
                      formattingFn={formatAnalyticsVolume}
                    />
                  </Mana>
                  <span className="stats-usd">
                    <CountUp
                      end={data.volumeUSD}
                      formattingFn={number =>
                        `$${formatAnalyticsVolume(number)}`
                      }
                    />
                  </span>
                </div>
              </Stats>
            </div>
            <div className="stats-container">
              <Icon className="stat-icon" name="star" />
              <Stats title={t('home_page.analytics.volume.creators_earnings')}>
                <div className="stats">
                  <Mana>
                    <CountUp
                      end={data.creatorsEarnings}
                      formattingFn={formatAnalyticsVolume}
                    />
                  </Mana>
                  <span className="stats-usd">
                    <CountUp
                      end={data.creatorsEarningsUSD}
                      formattingFn={number =>
                        `$${formatAnalyticsVolume(number)}`
                      }
                    />
                  </span>
                </div>
              </Stats>
            </div>
            <div className="stats-container">
              <Icon className="stat-icon" name="balance scale" />
              <Stats title={t('home_page.analytics.volume.dao_revenue')}>
                <div className="stats">
                  <Mana>
                    <CountUp
                      end={data.daoEarnings}
                      formattingFn={formatAnalyticsVolume}
                    />
                  </Mana>
                  <span className="stats-usd">
                    <CountUp
                      end={data.daoEarningsUSD}
                      formattingFn={number =>
                        `$${formatAnalyticsVolume(number)}`
                      }
                    />
                  </span>
                </div>
              </Stats>
            </div>
          </>
        ) : (
          <Loader size="medium" active />
        )}
      </div>
    </div>
  )
}

export default React.memo(AnalyticsVolumeDayData)